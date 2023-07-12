import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-up-coming',
  templateUrl: './up-coming.component.html',
  styleUrls: ['./up-coming.component.scss']
})
export class UpComingComponent {

  constructor(protected getFilms: FilmsService) { }

  @Input() film: Result | undefined = undefined

  @Output() details = new EventEmitter<Result>


  goToDetails = () => {
    this.details.emit(this.film)
  }

}
