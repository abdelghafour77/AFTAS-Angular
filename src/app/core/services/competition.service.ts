import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Competition } from '../models/competition';
import { Member } from '../models/member';
import { Ranking } from '../models/ranking';


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

  // getCompetition(id: number): Observable<Competition> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Competition>(url);
  // }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, competition, httpOptions);
  }

  searchByCriteria(criteria: string): Observable<Competition[]> {
    const url = `${this.apiUrl}/search/${criteria}`;
    return this.http.get<Competition[]>(url);
  }

  getCompetitionsByStatus(status: string): Observable<Competition[]> {
    const url = `${this.apiUrl}/status/${status}`;
    return this.http.get<Competition[]>(url);
  }

  getCompetitionsByCode(code: string): Observable<Ranking[]> {
    const url = `${this.apiUrl}/code/${code}`;
    return this.http.get<Member>(url).pipe(map(result => result.rankings));
  }

  registerMemberToCompetition(competitionCode: string, memberId: number): Observable<Competition> {
    console.log("competitionCode: " + competitionCode);
    const url = `${this.apiUrl}/register/${competitionCode}/${memberId}`;
    return this.http.put<Competition>(url, httpOptions);

  }

}
