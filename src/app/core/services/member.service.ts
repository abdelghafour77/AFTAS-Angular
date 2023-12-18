import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Member } from '../models/member';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  private apiUrl = 'http://localhost:8081/api/v1/members';


  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Member>(url);
  }

  createMember(member: Member): Observable<Member> {
    const apiUrl = this.apiUrl;
    return this.http.post<Member>(apiUrl, member, httpOptions);
  }
}
