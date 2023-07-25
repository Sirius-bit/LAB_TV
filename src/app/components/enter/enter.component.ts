import { Component } from '@angular/core';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent {

  constructor(private variable: VariablesComponentService) {
    variable.buttonToggle$.next(false) // HAMUBRGER MENU NON VISIBILE
    variable.footer$.next(true) // FOOTER VISIBILE
    variable.navbar$.next(false) // VOCI NAVBAR NON VISIBILI
  }

}
