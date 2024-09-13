import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  skip,
  Subscription,
  take,
} from 'rxjs';
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
  olympics$: Observable<countryData[]> = this.olympicService.getDatas();
  subscription!: Subscription;
  pieData: formattedPieDatas[] = [];
  showLegend: boolean = true;
  private router = inject(Router);

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.loadPieData();
  }

  loadPieData() {
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
        this.pieData = formattedData;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données:', error);
      },
    });
  }

  onPieSliceSelect(event: formattedPieDatas) {
    const selectedId = event.extra.id;  
    this.router.navigate(['/details', selectedId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}