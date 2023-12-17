import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Competition } from '../models/competition';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiUrl = 'http://localhost:8081/api/v1/competitions';


  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl);
  }

  getCompetition(id: number): Observable<Competition> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Competition>(url);
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, competition, httpOptions);
  }

  searchByCriteria(criteria: string): Observable<Competition[]> {
    const url = `${this.apiUrl}/search/${criteria}`;
    return this.http.get<Competition[]>(url);
  }

  // filterCompetitions(filter: string): Observable<Competition[]> {
  //   const url = `${this.apiUrl}/filter/${filter}`;
  //   return this.http.get<Competition[]>(url);
  // }

}
