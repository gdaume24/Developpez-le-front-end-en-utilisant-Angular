import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineChartModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
import { formattedLineDatas } from 'src/app/core/models/Charts';
import { countryData, participation } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [LineChartModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  private route = inject(ActivatedRoute);
  olympicsData: Observable<countryData[]> = this.olympicService.getDatas();
  subscription!: Subscription;
  lineData: formattedLineDatas[] = [];
  id = 0
  showLegend: boolean = true;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.loadLineData(this.id)
  }

  loadLineData(idCountry: number): formattedLineDatas[] | null {
    this.subscription = this.olympicsData.subscribe({
      next: (countriesData) => {
        if (countriesData.length > 0 && this.id > 0) {
          const countryData = countriesData[(idCountry-1)];
          this.lineData = [{
            "name": countryData.country,
            "series": countryData.participations.map((participation: participation) => ({
              "name": participation.year,
              "value": participation.medalsCount,
            })),
          }];
          console.log("lineData =",this.lineData)
        }
        return null; // Add a default return statement
      }
    });
    return null; // Add a default return statement
  }
  
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
