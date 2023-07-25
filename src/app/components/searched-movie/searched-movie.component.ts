import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-searched-movie',
  templateUrl: './searched-movie.component.html',
  styleUrls: ['./searched-movie.component.scss']
})
export class SearchedMovieComponent {

  constructor(protected search: SearchBarService, private getMoreFilms: SearchBarService, protected variable_v: VariablesComponentService) {
    variable_v.searchBar$.next(true) // SEARCH-BAR VISIBILE
  }

  page: number = 1

  // VISUALIZZAZIONE FILM DELLE PAGINE SUCCESSIVE
  loadMore = () => {
    this.page++
    this.showMoreFilms(this.page)
  }


  showMoreFilms = (page: number) => {
    this.getMoreFilms.getMovieSearched(this.search.valueSearch, page).subscribe({
      next: (data: any) => this.search.searchedFilms = this.search.searchedFilms?.concat(data.results)

    })
  }
}
