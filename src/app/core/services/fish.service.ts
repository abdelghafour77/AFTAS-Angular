import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Fish } from '../models/fish';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FishService {

  private apiUrl = 'http://localhost:8081/api/v1/fishes';


  constructor(private http: HttpClient) { }

  getFishes(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.apiUrl);
  }
}
