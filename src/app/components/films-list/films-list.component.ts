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
  constructor(private getListFilm: FilmsService, private route: Router, private search_v: VariablesComponentService) {
    this.getCompleteFilmList()
  }
  page: any = 1
  films?: Result[]

  getCompleteFilmList = () => {
    this.getListFilm.getMovies().subscribe({
      next: (data: any) => {
        console.log(data.results)
        this.films = data.results
      },
      error: (err: any) => console.log(err)

    })
  }

  loadMore = () => {
    this.page++
    this.showMoreFilms(this.page)
  }

  showMoreFilms = (page: number) => {
    this.getListFilm.getMoreFilms(page).subscribe({
      next: (data: any) => {
        console.log(data)
        this.films = this.films?.concat(data.results)
      }
    })
  }


  details = (film: Result) => {
    this.getListFilm.filmToShow$.next(film)
    this.route.navigateByUrl('film-details')
  }
}
