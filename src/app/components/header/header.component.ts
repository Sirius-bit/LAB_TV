import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    protected button_v: VariablesComponentService,
    private film: FilmsService,
    private route: Router
  ) {

    this.button_v.buttonToggle$.subscribe({
      next: (value: boolean) => {
        this.buttonToggle = value
        // console.log(this.buttonToggle);
      }
    })
  }

  buttonToggle?: boolean


  @Input() movie?: any

  search = (value?: string) => {
    this.film.getMovieSearched(value).subscribe({
      next: (data: any) => {
        if (value) {
          this.film.searchedFilms = data.results
          this.route.navigateByUrl('searched-movie')
          console.log(this.movie)
        }
        else {
          this.route.navigateByUrl('dashboard')
        }
      }
    })
  }
}
