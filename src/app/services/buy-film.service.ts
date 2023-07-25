import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Films, Result } from 'src/app/interfaces/films';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { BuyedFilm } from '../interfaces/buyed-film';

@Injectable({
  providedIn: 'root'
})
export class BuyMediaService {

  constructor(private http: HttpClient, private authService: RegisterService, private router: Router) { }

  private url = 'http://localhost:3000/'

  imageLink: string = 'https://image.tmdb.org/t/p/original'

  // (GET) ARRAY FILM ACQUISTATI
  getMedia = (): Observable<Films[]> => {
    return this.http.get<Films[]>(this.url + 'films-acquistati')
  }

  // (POST) FILM ACQUISTATI
  postMedia = (film: Result): Observable<BuyedFilm[]> => {
    const loggedUser = this.authService.getLoggedUser()
    const body = {
      date: film.release_date,
      id: film.id,
      image: film.poster_path,
      title: film.title
    }
    if (loggedUser) return this.http.post<BuyedFilm[]>(this.url + 'films-acquistati', body)
    this.router.navigate(['/login'])
    return of([])
  }

  // (DELETE) FILM ACQUISTATI
  deleteMedia = (id: any) => this.http.delete(`${this.url}films-acquistati/${id}`).subscribe()
}