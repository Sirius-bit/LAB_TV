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
    private button_v: VariablesComponentService,
    private fb: FormBuilder
  ) {
    this.button_v.buttonToggle$.next(false)
  }

  myForm: any

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

  onSubmit = (form: FormGroup) => {
    if (form.valid) {
      console.log(form.valid);

    }
  }
}
