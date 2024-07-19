import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { countryData } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<countryData[]>([]);

  constructor(private http: HttpClient) {}

  loadData() {
    this.http.get<countryData[]>(this.olympicUrl).pipe(
      (data) => {
        this.olympics$.next(data);
      },
      catchError((error, caught) => {
        console.error('Erreur lors du chargement des données:', error);
        this.olympics$.next([]);
        return caught;
      }
    )
  }

  getData() {
    return this.olympics$.asObservable();
  }
}
