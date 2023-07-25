import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilmsService } from 'src/app/services/films.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';
import { SimilarFilms } from 'src/app/interfaces/similar-films';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyMediaService } from 'src/app/services/buy-film.service';
import { Result } from 'src/app/interfaces/films';
import { FilmOnRefresh } from 'src/app/interfaces/film-details';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnDestroy, OnInit {

  private subscription: Subscription = new Subscription();
  film?: Result | FilmOnRefresh
  videoKey: string = ''
  urlVideo: string = ''
  director: string = ''
  genres: string[] = []
  credits: string[] = []
  similarFilms: SimilarFilms[] = []
  page: number = 1
  operationFailed: boolean = false
  error: boolean = false

  constructor(
    protected films: FilmsService,
    protected variable_v: VariablesComponentService,
    private route: Router,
    private router: ActivatedRoute,
    private buyMedia: BuyMediaService
  ) {
    this.variable_v.searchBar$.next(false)
    this.variable_v.footer$.next(false)
  }
  ngOnInit(): void {
    this.subscription.add(this.router.params.subscribe({
      next: params => {
        const id = params['id']
        this.getFilm(id)
      }
    }))
  }

  // GESTIONE FUNZIONI GET PER I FILM E RECUPERO DAL LOCAL STORAGE AL REFRESH
  getFilm = (id: number) => {
    console.log(this.films.filmToShow$);
    this.subscription.add(this.films.filmToShow$.subscribe({
      next: (film: any) => {
        if (film) {
          this.film = film
          this.getVideos(film.id)
          this.getGenres(film.id)
          this.getCredits(film.id)
          this.getSimilarFilms(film.id, this.page)
          localStorage.setItem('id', film.id)
        }
        else {
          const id = localStorage.getItem('id')
          const title = localStorage.getItem('title')
          const overview = localStorage.getItem('overview')
          const vote_average = localStorage.getItem('vote_average')
          this.film = {
            id: id,
            title: title,
            overview: overview,
            vote_average: vote_average
          }
          this.getVideos(id)
          this.getGenres(id)
          this.getCredits(id)
          this.getSimilarFilms(id, this.page)
        }
      }
    }))
  }

  // (GET) MOSTRARE FILM SIMILI
  getSimilarFilms = (id: any, page: number) => {
    this.subscription.add(this.films.getSimilarFilms(id, this.page).subscribe({
      next: (similarFilms) => {
        if (similarFilms) {
          this.variable_v.showMore = true
          this.similarFilms = similarFilms.results
        }
      }
    }))
  }

  // CLICK PER MOSTRARE LE PAGINE SUCCESSIVE PER I FILM SIMILI
  loadMore = (id: any) => {
    this.page++
    this.showMoreFilms(id, this.page)
  }

  // (GET) ALTRI FILM SIMILI
  showMoreFilms = (id: number, page: number) => {
    this.films.getSimilarFilms(id, page).subscribe({
      next: (data: any) => this.similarFilms = this.similarFilms.concat(data.results)
    })
  }

  // (GET) PER IL VIDEO
  getVideos = (id: any) => {
    this.subscription.add(this.films.getVideos(id).subscribe({
      next: (data: any) => {
        const officialTrailerVideo = data.results.find((video: any) => video.name === "Official Trailer")
        if (officialTrailerVideo) {
          this.error = false
          this.videoKey = officialTrailerVideo.key
        }
        else {
          const officialTrailerVideo = data.results.find((video: any) => video.name.toLowerCase().includes("trailer"))
          if (officialTrailerVideo && officialTrailerVideo.key) {
            this.videoKey = officialTrailerVideo.key
            this.error = false
          } else this.error = true

        }
      },
      error: (err: any) => this.error = true
    }));
  }

  // (GET) GENERI
  getGenres = (id: any) => {
    this.films.getDetails(id).subscribe({
      next: (detail: any) => this.genres = detail.genres.map((g: any) => g.name)
    })
  }

  // (GET) CREDITI
  getCredits = (id: any) => {
    this.films.getCredits(id).subscribe({
      next: (credit: any) => {
        this.credits = credit.credits.cast.map((c: any) => c.name).slice(0, 4).join(' - ')
        const directing = credit.credits.cast.find((c: any) => c.known_for_department === "Directing")
        if (directing) this.director = directing.name
        else {
          const directing = credit.credits.crew.find((c: any) => c.known_for_department === "Directing")
          this.director = directing.name
        }
      }
    })
  }

  // (GET) ACQUISTO FILM
  buyMovie = () => {
    const dialog = document.querySelector('dialog')
    dialog?.showModal()
  }

  // GESTIONE ACQUISTO
  buyOrNot = (buy: boolean, film?: any) => {
    const dialog = document.querySelector('dialog')
    if (buy) {
      if (localStorage.getItem('user') === null) this.route.navigateByUrl('/unauthorized')
      else {
        this.buyMedia.postMedia(film).subscribe({
          error: (err: any) => this.operationFailed = true
        })
      }
    }
    dialog?.close()
  }

  // CHIUSURA DIALOG
  closeError = () => {
    const dialog = document.querySelector('dialog')
    dialog?.close()
  }

  // GESTIONE DETTAGLI FILM SIMILI
  goToDetailSimilarFilm = (similarFilm: any) => {
    this.films.filmToShow$.next(similarFilm)
    localStorage.setItem('id', similarFilm.id.toString())
    localStorage.setItem('title', similarFilm.title)
    localStorage.setItem('overview', similarFilm.overview)
    localStorage.setItem('vote_average', similarFilm.vote_average)
    const id = localStorage.getItem('id')
    this.route.navigate(['film-details', similarFilm.id])
  }

  // ELIMINAZIONE LOCAL STORAGE E SUBSCRIPTION
  ngOnDestroy(): void {
    localStorage.removeItem('id')
    localStorage.removeItem('id')
    localStorage.removeItem('title')
    localStorage.removeItem('overview')
    localStorage.removeItem('vote_average')
    this.subscription.unsubscribe()
  }
}
