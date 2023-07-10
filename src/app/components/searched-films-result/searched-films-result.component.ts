import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-searched-films-result',
  templateUrl: './searched-films-result.component.html',
  styleUrls: ['./searched-films-result.component.scss']
})
export class SearchedFilmsResultComponent {

  constructor(private route: Router, private getFilms: FilmsService) { }

  @Input() movie?: any


  goToDetails = () => {
    this.getFilms.filmToShow$.next(this.movie)
    console.log(this.movie.id)
    this.route.navigateByUrl('film-details')
  }

}
