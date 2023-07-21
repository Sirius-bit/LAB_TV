import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-popular-films',
  templateUrl: './popular-films.component.html',
  styleUrls: ['./popular-films.component.scss']
})
export class PopularFilmsComponent {
  constructor(protected getFilms: FilmsService) { }

  @Input() film: any

  @Output() details = new EventEmitter<any>


  goToDetails = () => {
    this.details.emit(this.film)
  }
}
