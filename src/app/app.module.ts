import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GraphicTitleComponent } from './components/graphic-title/graphic-title.component';
import { InformativeSquareComponent } from './components/informative-square/informative-square.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphicTitleComponent,
    InformativeSquareComponent,
    PieChartComponent,
  ],
  providers: [],
  exports: [
    GraphicTitleComponent,
    InformativeSquareComponent,
    PieChartComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
