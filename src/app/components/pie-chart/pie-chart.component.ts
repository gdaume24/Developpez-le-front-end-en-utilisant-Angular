import { Component, OnInit } from '@angular/core';
import { map, Observable, of, skip, Subscription, take } from 'rxjs';
import { countryData, participation } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { formattedPieDatas } from 'src/app/core/models/Charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  standalone: true,
  imports: [NgxChartsModule],
})
export class PieChartComponent implements OnInit {
  olympics$: Observable<countryData[]> = of([]);
  subscription!: Subscription;
  formattedData: formattedPieDatas[] = [];
  showLegend: boolean = true;

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.olympics$ = this.olympicService.getOlympics().pipe(take(2), skip(1));
    this.subscription = this.olympics$.subscribe({
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
        this.formattedData = formattedData;
        console.log('registered ->', this.formattedData);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
