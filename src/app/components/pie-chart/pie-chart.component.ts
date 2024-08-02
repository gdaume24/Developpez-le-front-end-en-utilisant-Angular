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
})
export class PieChartComponent implements OnInit {
  countriesNames: string[] = [];
  totalMedalsList: number[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.pieData$.subscribe(([countriesNames, totalMedalsList]) => {
      this.countriesNames = countriesNames;
      this.totalMedalsList = totalMedalsList;
    });

    console.log('Countries Names:', this.countriesNames);
    console.log('Total Medals List:', this.totalMedalsList);
  }

  pieData$: Observable<[string[], number[]]> = this.olympicService.datas$.pipe(
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

  // this.Cheese(this.countriesNames, this.totalMedalsList);

  countriesAndTotalMedalsList(): [string[], number[]] {
    let totalMedalsList: number[] = [];
    let countriesNames: string[] = [];
    next: (datas: countryData[]) => {
      if (datas != null) {
        for (let i = 0; i < datas.length; i++) {
          countriesNames.push(datas[i].country);

          let countryTotalMedals = 0;
          for (let j = 0; j < datas[i].participations.length; j++) {
            countryTotalMedals += datas[i].participations[j].medalsCount;
          }
          totalMedalsList.push(countryTotalMedals);
        }
      }
    };
    return [countriesNames, totalMedalsList];
  }

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
