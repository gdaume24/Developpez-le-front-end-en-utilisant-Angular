import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  numberOfJO: number = 0;
  numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.olympics$.subscribe((data) => {
      this.calculateStats(data);
    });
    console.log('numberofJO =', this.numberOfJO, this.numberOfCountries);
  }

  private calculateStats(data: countryData[]) {
    this.olympics$.subscribe((data) => {
      // Calculer le nombre de JO
      console.log('data =', data);
      console.log('type =', typeof data);
      this.numberOfJO = Math.max(...data.map((o) => o.id));

      // Calculer le nombre de pays
      // this.numberOfCountries = Math.max(...data.map((country) => country.id));
    });
  }
}
