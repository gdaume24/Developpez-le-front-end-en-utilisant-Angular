import { Component, OnInit } from '@angular/core';
import { OlympicService } from './core/services/olympic.service';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importez BrowserAnimationsModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadDataInCache().subscribe();
  }
}
