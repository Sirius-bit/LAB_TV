import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Films, Result } from 'src/app/interfaces/films';
import { Router } from '@angular/router';
import { Details } from 'src/app/interfaces/film-details';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class BuyMediaService {

  constructor(private http: HttpClient, private authService: RegisterService, private router: Router) { }

  private url = 'http://localhost:3000/'

  imageLink: string = 'https://image.tmdb.org/t/p/original'

  getMedia = (): Observable<Films[]> => {
    return this.http.get<Films[]>(this.url + 'films-acquistati')
  }

  postMedia = (film: any): Observable<any[]> => {
    const loggedUser = this.authService.getLoggedUser()
    const body = {
      id: film.id,
      title: film.title,
      image: film.poster_path,
      date: film.release_date
    }
    console.log(loggedUser)
    if (loggedUser) {
      return this.http.post<any[]>(this.url + 'films-acquistati', body)
    }
    this.router.navigate(['/login'])
    return of([])
  }
}