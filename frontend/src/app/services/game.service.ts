import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../models/Games';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) { }

  public save(game: Game): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', ' application/json');
    return this._http.post(`${this.url}games`, game, { headers });

  }

  public edit(id: any, game: Game): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', ' application/json');
    return this._http.put(`${this.url}games/${id}`, game, { headers });
  }

  public delete(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', ' application/json');
    return this._http.delete(`${this.url}games/${id}`, { headers });
  }

  public getGames(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', ' application/json');
    return this._http.get(`${this.url}games`, { headers });
  }

  public getGame(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', ' application/json');
    return this._http.get(`${this.url}games/${id}`, { headers });
  }
}
