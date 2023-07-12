import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';
import { SimilarFilms } from 'src/app/interfaces/similar-films';
import { Popular } from 'src/app/interfaces/popular-films';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnDestroy {

  private subscription: Subscription = new Subscription();
  film?: Result | Popular | any
  videoKey: string = ''
  urlVideo: string = ''
  director: string = ''
  genres: string[] = []
  credits: string[] = []
  similarFilms: SimilarFilms[] = []
  page: number = 1

  constructor(
    protected films: FilmsService,
    private headerFooter: VariablesComponentService,
    private route: Router
  ) {
    this.getFilm()
    this.headerFooter.searchBar$.next(false)
    this.headerFooter.footer$.next(false)
  }

  getFilm = () => {
    this.subscription.add(this.films.filmToShow$.subscribe({
      next: film => {
        this.film = film;
        // console.log(this.film)
        this.getVideos(film?.id)
        this.getGenres(film?.id)
        this.getCredits(film?.id)
        this.getSimilarFilms(film?.id, this.page)
        // console.log(film?.id);
      }
    }))
  }

  getSimilarFilms = (id: any, page: number) => {
    this.subscription.add(this.films.getSimilarFilms(id, this.page).subscribe({
      next: (similarFilms) => {
        this.similarFilms = similarFilms.results
        console.log(similarFilms)
        // console.log(this.similarFilms)
      }
    }))
  }

  loadMore = () => {
    this.page++
    this.showMoreFilms(this.film?.id, this.page)
  }

  showMoreFilms = (id: number, page: number) => {
    this.films.getSimilarFilms(id, page).subscribe({
      next: (data: any) => {
        console.log(data)
        this.similarFilms = this.similarFilms.concat(data.results)
      }
    })
  }

  getVideos = (id: any) => {
    this.subscription.add(this.films.getVideos(id).subscribe({
      next: (data: any) => {
        // console.log(data)
        const officialTrailerVideo = data.results.find((video: any) => video.name === "Official Trailer");
        if (officialTrailerVideo) {
          this.videoKey = officialTrailerVideo.key;
          console.log(this.videoKey);
        }
        else if (!officialTrailerVideo) {
          const officialTrailerVideo = data.results.find((video: any) => video.name.toLowerCase().includes("trailer"))
          console.log(officialTrailerVideo);
          this.videoKey = officialTrailerVideo.key
          console.log(this.videoKey)
        }
        else if (!officialTrailerVideo.key) {
          this.videoKey = officialTrailerVideo.key
          console.log(this.videoKey)
        }

      }
    }))
  }

  getGenres = (id: any) => {
    this.films.getDetails(id).subscribe({
      next: (detail: any) => {
        this.genres = detail.genres.map((g: any) => g.name)
        // console.log(this.genres)
      }
    })
  }

  getCredits = (id: any) => {
    this.films.getCredits(id).subscribe({
      next: (credit: any) => {
        // console.log(credit)
        this.credits = credit.credits.cast.map((c: any) => c.name).slice(0, 4).join(' ')
        // console.log(this.credits)
        const directing = credit.credits.cast.find((c: any) => c.known_for_department === "Directing")
        if (directing) {
          this.director = directing.name
          // console.log(this.director)
        }
        else {
          const directing = credit.credits.crew.find((c: any) => c.known_for_department === "Directing")
          this.director = directing.name
          // console.log(this.director)
        }
      }
    })
  }

  goToDetailSimilarFilm = (similarFilm: any) => {
    this.films.filmToShow$.next(similarFilm)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
