import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  constructor(protected getFilms: FilmsService) { }


  @Input() film: Result | undefined = undefined

  @Output() details = new EventEmitter<Result>


  goToDetails = () => {
    this.details.emit(this.film)
  }

}
