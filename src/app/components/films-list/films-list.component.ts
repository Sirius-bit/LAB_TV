import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent {
  constructor(protected getListFilm: FilmsService, private route: Router, protected variable: VariablesComponentService) {
    // this.getCompleteFilmList()
  }

  details = (film: Result) => {
    this.getListFilm.filmToShow$.next(film)
    this.route.navigateByUrl('film-details')
  }
}
