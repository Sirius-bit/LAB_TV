import { Injectable } from '@angular/core';
import { Result } from '../interfaces/films';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor(private http: HttpClient) { }

  searchedFilms?: Result[]
  valueSearch$: string = ''

  getMovieSearched = (query?: string | any, page?: number) => {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${environment.apiKey}&query=${query}&page=${page}`)
  }
}
