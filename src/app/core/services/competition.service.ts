import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Competition } from '../models/competition';
import { Member } from '../models/member';
import { Ranking } from '../models/ranking';
import { CompetitionPage } from '../models/competitionPage';


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
  getPaginateCompetitions(page: number): Observable<CompetitionPage> {
    const url = `${this.apiUrl}/pageable?page=${page}&size=4`;
    return this.http.get<CompetitionPage>(url);
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

  searchByCriteriaPaginate(criteria: string, page: number): Observable<CompetitionPage> {
    const url = `${this.apiUrl}/search/${criteria}?page=${page}&size=4`;
    return this.http.get<CompetitionPage>(url);
  }

  getCompetitionsByStatus(status: string): Observable<Competition[]> {
    const url = `${this.apiUrl}/status/${status}`;
    return this.http.get<Competition[]>(url);
  }

  getCompetitionsByStatusPaginate(status: string, page: number): Observable<CompetitionPage> {
    const url = `${this.apiUrl}/status/${status}?page=${page}&size=4`;
    return this.http.get<CompetitionPage>(url);
  }

  // getCompetitionsByCode(code: string): Observable<Ranking[]> {
  //   const url = `${this.apiUrl}/code/${code}`;
  //   return this.http.get<Member>(url).pipe(map(result => result.rankings));
  // }

  registerMemberToCompetition(competitionCode: string, memberId: number): Observable<Competition> {
    console.log("competitionCode: " + competitionCode);
    const url = `${this.apiUrl}/register/${competitionCode}/${memberId}`;
    return this.http.put<Competition>(url, httpOptions);

  }

  getMembersNotRegistered(code: string): Observable<Member[]> {
    const url = `${this.apiUrl}/registered-members/${code}`;
    return this.http.get<Member[]>(url);
  }
  getMembersNotRegisterdWithSearch(code: string, criteria: string): Observable<Member[]> {
    const url = `${this.apiUrl}/registered-members/${code}/${criteria}`;
    return this.http.get<Member[]>(url);
  }

  getCompetition(code: string): Observable<Competition> {
    const url = `${this.apiUrl}/code/${code}`;
    return this.http.get<Competition>(url);
  }

  getTopThree(code: string): Observable<Ranking[]> {
    const url = `${this.apiUrl}/topThree/${code}`;
    return this.http.get<Ranking[]>(url);
  }

}
