import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/app/interfaces/films';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  constructor(protected getFilms: FilmsService, private route: Router) { }


  @Input() film?: Result

  @Output() details = new EventEmitter<Result>

  // OUTPUT PER I DETTAGLI VERSO DASHBOARD E FILM LIST
  goToDetails = () => {
    this.details.emit(this.film)
    console.log(this.film?.title)
  }

}
