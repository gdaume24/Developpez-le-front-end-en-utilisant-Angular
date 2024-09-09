import { Component, OnInit } from '@angular/core';
import { LineChartModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
import { countryData } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [LineChartModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  olympicsData: Observable<countryData[]> = this.olympicService.getDatas();
  subscription!: Subscription;
  lineData = [];

  constructor(private olympicService: OlympicService) {}
  datas = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    }
  ]

  ngOnInit(): void {
    this.loadPieData()
  }

  loadPieData() {
    this.subscription = this.olympicsData.subscribe({
      next: (countriesData) => {
        const formattedData = countriesData.map((country) => {
          // Calcul du nombre total de médailles
          const totalMedals = country.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0
          );
          // Formatage des données selon le schéma demandé
          return {
            name: country.country,
            value: totalMedals,
            extra: {
              id: country.id.toString(),
            },
          };
        });
        // this.lineData = formattedData;
      },
    })
}
}
