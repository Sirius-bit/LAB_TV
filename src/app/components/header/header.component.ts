import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { SearchBarService } from 'src/app/services/search-bar.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(
    protected variable_v: VariablesComponentService,
    private film: FilmsService,
    private route: Router,
    private searchBar: SearchBarService
  ) {

    variable_v.buttonToggle$.subscribe({
      next: (value: boolean) => this.buttonToggle = value
    })

    variable_v.navbar$.subscribe({
      next: (value: boolean) => this.navbar = value
    })
  }

  buttonToggle?: boolean
  navbar?: boolean
  page: number = 1


  @Input() movie?: any

  search = (value?: string) => {
    this.searchBar.getMovieSearched(value, this.page).subscribe({
      next: (data: any) => {
        if (value) {
          this.searchBar.valueSearch = value
          this.variable_v.showMore = true
          this.route.navigateByUrl('searched-movie')
          this.searchBar.searchedFilms = data.results
        }
        else {
          this.route.navigateByUrl('dashboard')
        }
      }
    })
  }

  deleteUser = () => {
    localStorage.clear()
  }
}
