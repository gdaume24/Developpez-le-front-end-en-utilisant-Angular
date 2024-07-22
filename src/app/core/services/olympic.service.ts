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

  constructor(private http: HttpClient) {}

  monObservable = this.http.get<countryData[]>(this.olympicUrl)

  loadData() {
    this.monObservable.subscribe({
        next: (this.olympics$.next(data))
        error: catchError((error, caught) => {
          console.error('Erreur lors du chargement des données:', error);
          this.olympics$.next([]);
          return caught;
      })
    })
  }

