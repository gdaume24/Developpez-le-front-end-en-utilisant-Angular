import { Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { map, Observable, of } from 'rxjs';
import { countryData, participation } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  standalone: true,
})
export class PieChartComponent implements OnInit {
  olympics$: Observable<countryData[]> = [];
  countriesNames: string[] = [];
  totalMedalsList: number[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    olympics$ = this.olympicService.getOlympics();

    pieData$: Observable<[string[], number[]]> = this.datas$.pipe(
      map((datas: countryData[]) => {
        let countriesNames: string[] = [];
        let totalMedalsList: number[] = [];

        datas.forEach((data) => {
          countriesNames.push(data.country);

          let countryTotalMedals = data.participations.reduce(
            (acc: number, participation: participation) =>
              acc + participation.medalsCount,
            0
          );
          totalMedalsList.push(countryTotalMedals);
        });

        return [countriesNames, totalMedalsList];
      })
    );

    this.olympicService.pieData$.subscribe(
      ([countriesNames, totalMedalsList]) => {
        this.countriesNames = countriesNames;
        this.totalMedalsList = totalMedalsList;
      }
    );
    console.log('Data :', this.olympicService.datas$.subscribe());
    console.log('Countries Names:', this.countriesNames);
    console.log('Total Medals List:', this.totalMedalsList);
  }

  // this.Cheese(this.countriesNames, this.totalMedalsList);

  Cheese(countriesNames: any, totalMedalsList: any) {
    const root = am5.Root.new('pie');
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        categoryField: 'country',
        valueField: 'medals',
      })
    );

    let data = countriesNames.map((countryName: any, index: any) => ({
      country: countryName,
      medals: totalMedalsList[index],
    }));

    series.data.setAll(data);
  }
}
