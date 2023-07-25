import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private variable: VariablesComponentService,
    private fb: FormBuilder
  ) {
    variable.buttonToggle$.next(false) // TOGLIE L'HAMBURGER MENU
    variable.navbar$.next(false) // TOGLIE LE VOCI DELLA NAVBAR
  }

  myForm: any

  // VALIDAZIONI INPUT
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      cognome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{3}[0-9]{3}[0-9]{4}$')]],
      messaggio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      checkbox: ['', [Validators.required]]
    })
  }

  // VERIFICA VALIDAZONE
  onSubmit = (form: FormGroup) => {
    if (form.valid) {
      console.log(form.valid);
    }
  }
}
