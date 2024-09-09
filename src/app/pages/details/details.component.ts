import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GraphicTitleComponent } from 'src/app/components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from 'src/app/components/informative-square/informative-square.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { countryData } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  standalone: true,
  imports: [GraphicTitleComponent, InformativeSquareComponent, LineChartComponent],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  olympicsData: Observable<countryData[]> = this.olympicService.getDatas();
  private route = inject(ActivatedRoute);
  subscription!: Subscription;
  id = 0;
  numberOfEntries = 0;
  totalMedalsCount = 0;
  totalAthleteCount = 0;
  countryName = "";

  constructor(private location: Location, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.calculateStatsDetails(this.id)
  }

  calculateStatsDetails(idCountry: number) {
    this.subscription = this.olympicsData.subscribe({
      next: (data) => {
        if (data.length > 0) {
          const countryData = data[(idCountry-1)];
          this.countryName = countryData.country
          this.numberOfEntries = countryData.participations.length;
          countryData.participations.forEach(participation => {
            this.totalMedalsCount += participation.medalsCount;
            this.totalAthleteCount += participation.athleteCount;
          })
        }    
      }
    })    
  }

  nav() {
    this.location.back();
    };

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}




