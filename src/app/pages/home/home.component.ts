import { Component } from '@angular/core';
import { GraphicTitleComponent } from 'src/app/components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from 'src/app/components/informative-square/informative-square.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

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
export class HomeComponent {}
