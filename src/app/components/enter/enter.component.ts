import { Component } from '@angular/core';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent {

  constructor(private variable: VariablesComponentService) {
    this.variable.buttonToggle$.next(false)
    variable.footer$.next(true)
    variable.navbar$.next(false)
  }

}
