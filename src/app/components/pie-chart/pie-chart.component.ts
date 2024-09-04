import { Component, inject, OnInit } from '@angular/core';
import { catchError, map, Observable, of, skip, Subscription, take } from 'rxjs';
import { countryData, participation } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { formattedPieDatas } from 'src/app/core/models/Charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  imports: [NgxChartsModule],
})
export class PieChartComponent implements OnInit {
  olympics$: Observable<countryData[]> = of([]);
  subscription!: Subscription;
  formattedData: formattedPieDatas[] = [];
  showLegend: boolean = true;
  private router = inject(Router);

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.olympics$ = this.olympicService.getOlympics().pipe(
    take(2), 
    skip(1), 
    catchError(error => {
      console.error('Erreur dans getOlympics:', error);
      return of([]); // Retourner des données vides en cas d'erreur
    }));
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
      },
    });
  }

  onPieSliceSelect(event: any) {
    const selectedId = event.extra.id
    this.router.navigate(['/details', selectedId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
