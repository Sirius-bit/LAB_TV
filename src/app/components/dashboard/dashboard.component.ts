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
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[]

  constructor(public getFilms: FilmsService, private route: Router, private headerFooter: VariablesComponentService) {
    this.getPopularFilmsFromService()
    this.getNowPlayingFilmsFromService()
    this.getTopRatedFilmsFromService()
    this.getUpComingFilmsFromService()
    this.headerFooter.searchBar$.next(true)
    this.headerFooter.footer$.next(true)

    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 6,
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
        numVisible: 3,
        numScroll: 1
      }
    ]
  }

  getPopularFilmsFromService = () => {
    this.getFilms.getPopular().subscribe({
      next: (data: any) => {
        // console.log(data.results)
        this.getFilms.popularFilms = data.results
      },
      error: (err: any) => console.log(err)
    })
  }

  getNowPlayingFilmsFromService = () => {
    this.getFilms.getNowPlaying().subscribe({
      next: (value: any) => {
        // console.log(value.results)
        this.getFilms.nowPlayingFilms = value.results
      }
    })
  }

  getTopRatedFilmsFromService = () => {
    this.getFilms.getTopRated().subscribe({
      next: (value: any) => {
        this.getFilms.topRatedFilms = value.results
      }
    })
  }

  getUpComingFilmsFromService = () => {
    this.getFilms.getUpComing().subscribe({
      next: (value: any) => {
        this.getFilms.upComingFilms = value.results
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
