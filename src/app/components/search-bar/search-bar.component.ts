import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(private film: FilmsService, protected search_v: VariablesComponentService, private route: Router) {

    this.search_v.searchBar$.subscribe({
      next: (value) => {
        this.searchBoolean = value
      }
    })
  }

  searchBoolean?: boolean
  search: string = ''


  @Output() searchEmit = new EventEmitter<string>()

  searchedFilm = () => {
    // console.log(this.searchValue);
    this.searchEmit.emit(this.search)
  }

}









