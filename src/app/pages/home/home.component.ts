import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GraphicTitleComponent } from 'src/app/components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from 'src/app/components/informative-square/informative-square.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { countryData } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  standalone: true,
  imports: [
    GraphicTitleComponent,
    InformativeSquareComponent,
    PieChartComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<countryData[]> = this.olympicService.getDatas();
  subscription!: Subscription;
  countriesIdList: number[] = [];
  numberOfCountries: number = 0;
  participationIdList: number[] = [];
  numberOfJO: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.subscription = this.olympics$.subscribe((data) => {
      this.calculateStats(data);
    });

  }

  private calculateStats(data: countryData[]) {

    // Pour chaque pays, pousse l'id dans une liste
    data.forEach((country) => {
      this.countriesIdList.push(country.id);
      // Pour chaque participations de chaque pays, pousse l'id dans une deuxième liste
      country.participations.forEach((participation) => {
        this.participationIdList.push(participation.id);
      });
    })
    // Max liste 1
    this.numberOfCountries = Math.max(...this.countriesIdList);
    // Max liste 2
    this.numberOfJO = Math.max(...this.participationIdList);
    };

    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
  }

