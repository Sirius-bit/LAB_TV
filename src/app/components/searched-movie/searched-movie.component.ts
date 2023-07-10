import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-searched-movie',
  templateUrl: './searched-movie.component.html',
  styleUrls: ['./searched-movie.component.scss']
})
export class SearchedMovieComponent {

  constructor(private route: Router, public getFilm: FilmsService) { }

}
