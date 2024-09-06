import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  skip,
  take,
  tap,
} from 'rxjs';
import { countryData } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<countryData[]>([]);
  public olympicObservable = this.olympics$.asObservable()

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getDatas(): Observable<countryData[]> {
    return this.olympics$.asObservable().pipe(
      take(2),
      skip(1),
      catchError((error) => {
        console.error('Erreur dans getOlympics:', error);
        return of([]); // Retourner des données vides en cas d'erreur
      })
    );
  }
}
