import { Component, Inject } from '@angular/core';
import { OlympicService } from '../../core/services/olympics.service';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Observable, of } from 'rxjs';
import { countryData } from '../../core/models/olympics';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  private root!: am5.Root;
  public olympics$: Observable<countryData[]> = of([]);
  countriesNames: string[] = [];
  totalMedalsList: number[] = [];

  constructor(private olympicService: OlympicService) {
    [this.countriesNames, this.totalMedalsList] =
      this.countriesAndTotalMedalsList();
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getData();
    console.log(this.olympics$);
    this.Cheese(this.countriesNames, this.totalMedalsList);
  }

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
