import { Component, EventEmitter, Output } from '@angular/core';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(protected search_v: VariablesComponentService) {

    search_v.searchBar$.subscribe({
      next: (value) => {
        this.searchBoolean = value
      }
    })
  }

  searchBoolean?: boolean
  search: string = ''


  @Output() searchEmit = new EventEmitter<string>()

  // OUTPUT PER IL VALUE DELL'INPUT DI RICERCA
  searchedFilm = () => {
    this.searchEmit.emit(this.search)
  }

}









