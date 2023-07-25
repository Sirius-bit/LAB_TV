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

  constructor(public getFilms: FilmsService, private route: Router, protected variable: VariablesComponentService) {

    // INZIO CHIAMATE PER I FILM
    this.getPopularFilmsFromService()
    this.getNowPlayingFilmsFromService()
    this.getTopRatedFilmsFromService()
    this.getUpComingFilmsFromService()

    // FINE CHIAMATE PER I FILM
    variable.searchBar$.next(true) // SEARCH BAR VISIBILE
    variable.footer$.next(true) // FOOTER VISIBILE
    variable.buttonToggle$.next(true) // HAMBURGER MENU VISIBILE
    variable.navbar$.next(true) // NAVBAR VISIBILE
    variable.dashboard = false // LOGO CLICCABILE PER TORNARE IN DASHBOARD

    // GESTIONE SLIDER RESPONSIVE
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
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '700px',
        numVisible: 2,
        numScroll: 1
      }
    ]
  }


  page: number = 1
  nowPlaying: string = 'now_playing'
  popular: string = 'popular'
  upComing: string = 'upcoming'
  topRated: string = 'top_rated'

  // (GET) FILM POPOLARI
  getPopularFilmsFromService = () => {
    this.getFilms.getPopular().subscribe({
      next: (data: any) => {
        this.getFilms.popularFilms = data.results
      }
    })
  }

  // (GET) FILM NOW PLAYING
  getNowPlayingFilmsFromService = () => {
    this.getFilms.getNowPlaying().subscribe({
      next: (value: any) => this.getFilms.nowPlayingFilms = value.results
    })
  }

  // (GET) FILM TOP RATED
  getTopRatedFilmsFromService = () => {
    this.getFilms.getTopRated().subscribe({
      next: (value: any) => this.getFilms.topRatedFilms = value.results

    })
  }

  // (GET) UP COMING FILM
  getUpComingFilmsFromService = () => {
    this.getFilms.getUpComing().subscribe({
      next: (value: any) => this.getFilms.upComingFilms = value.results
    })
  }

  // CLICK PER I DETTAGLI E SALVATAGGIO DI ALCUNI NEL LOCAL STORAGE
  details = (film: Result) => {
    this.getFilms.filmToShow$.next(film)
    localStorage.setItem('id', film.id.toString())
    localStorage.setItem('title', film.title)
    localStorage.setItem('overview', film.overview)
    localStorage.setItem('vote_average', film.vote_average)
    const id = localStorage.getItem('id')
    this.route.navigate(['film-details', id])
  }

  // MOSTRARE I FILM DELLA STESSA CATEGORIA
  showFilms = (type: string) => {
    this.getFilms.getFilmFromSlider(type, this.page).subscribe({
      next: (listFilm: any) => {
        if (listFilm) {
          this.getFilms.similarFilmsFromSlider = listFilm.results
          console.log(listFilm)
        }
      }
    })
    this.route.navigateByUrl('films-list')
  }
}
