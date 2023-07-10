import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-popular-films',
  templateUrl: './popular-films.component.html',
  styleUrls: ['./popular-films.component.scss']
})
export class PopularFilmsComponent {
  constructor(protected getFilms: FilmsService) { }

  @Input() popular: any

  @Output() details = new EventEmitter<any>


  goToDetails = () => {
    console.log(this.popular);
    this.details.emit(this.popular)
  }
}
