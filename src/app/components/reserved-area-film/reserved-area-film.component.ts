import { Component } from '@angular/core';
import { BuyMediaService } from 'src/app/services/buy-film.service';

@Component({
  selector: 'app-reserved-area-film',
  templateUrl: './reserved-area-film.component.html',
  styleUrls: ['./reserved-area-film.component.scss']
})
export class ReservedAreaFilmComponent {

  constructor(protected buyedFilm: BuyMediaService) {
    this.getBuyedMedia()
  }

  buyedFilms: any[] = []

  getBuyedMedia = () => {
    this.buyedFilm.getMedia().subscribe({
      next: (films: any) => {
        console.log(films)
        this.buyedFilms = films
      }
    })
  }

}
