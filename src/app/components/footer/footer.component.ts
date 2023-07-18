import { Component } from '@angular/core';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private footer_v: VariablesComponentService) {

    this.footer_v.footer$.subscribe({
      next: (value) => {
        // console.log(value)
        this.footer = value
      }
    })
  }


  footer: any
}
