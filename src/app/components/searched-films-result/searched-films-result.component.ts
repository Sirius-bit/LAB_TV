import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-searched-films-result',
  templateUrl: './searched-films-result.component.html',
  styleUrls: ['./searched-films-result.component.scss']
})
export class SearchedFilmsResultComponent {

  constructor(private route: Router, protected getFilms: FilmsService) { }

  @Input() movie?: any


  goToDetails = () => {
    this.getFilms.filmToShow$.next(this.movie)
    localStorage.setItem('id', this.movie.id.toString())
    localStorage.setItem('title', this.movie.title)
    localStorage.setItem('overview', this.movie.overview)
    localStorage.setItem('vote_average', this.movie.vote_average)
    const id = localStorage.getItem('id')
    this.route.navigate(['film-details', this.movie.id])
  }

}
