import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent {

  constructor(protected getFilms: FilmsService) { }

  @Input() film: Result | undefined = undefined

  @Output() details = new EventEmitter<Result>

  // OUTPUT PER DETTAGLI FILM
  goToDetails = () => this.details.emit(this.film)


}
