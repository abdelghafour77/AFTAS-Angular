import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Hunting, CHunting } from '../models/hunting';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HuntingService {

  private apiUrl = 'http://localhost:8081/api/v1/hunting';

  constructor(private http: HttpClient) { }

  createHunting(hunting: Hunting): Observable<Hunting> {
    return this.http.post<Hunting>(this.apiUrl, hunting, httpOptions);
  }
}
