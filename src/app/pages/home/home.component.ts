import { Component } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';
import { GraphicTitleComponent } from 'src/app/components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from 'src/app/components/informative-square/informative-square.component';

@Component({
  standalone: true,
  imports: [GraphicTitleComponent, InformativeSquareComponent, PieChartComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
