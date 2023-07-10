import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];

  constructor(public getFilms: FilmsService, private route: Router, private headerFooter: VariablesComponentService) {
    this.getFilmsFromService()
    this.getPopularFromService()
    this.headerFooter.searchBar$.next(true)
    this.headerFooter.footer$.next(true)

    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '950px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '700px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }



  getFilmsFromService = () => {
    this.getFilms.getMovies().subscribe({
      next: (data: any) => {
        // console.log(data.results)
        this.getFilms.films = data.results
      },
      error: (err: any) => console.log(err)

    })
  }

  getPopularFromService = () => {
    this.getFilms.getPopular().subscribe({
      next: (value: any) => {
        console.log(value.results)
        this.getFilms.popularFilm = value.results
      }
    })
  }

  details = (film: Result) => {
    this.getFilms.filmToShow$.next(film)
    this.route.navigateByUrl('film-details')
  }

  showFilms = () => {
    this.route.navigateByUrl('films-list')
  }
}
