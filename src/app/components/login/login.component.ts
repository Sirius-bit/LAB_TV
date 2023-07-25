import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesComponentService } from 'src/app/services/variables-component.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: Router,
    private variable: VariablesComponentService,
    private fb: FormBuilder,
    private auth: RegisterService
  ) {
    variable.buttonToggle$.next(false) // HAMBURGER MENU  NON VISIBILE
    variable.navbar$.next(false) // VOCI NAVBAR NON VISIBILI
  }

  myForm: any
  notValid: boolean = false

  // VALIDATORS
  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // VALIDAZIONE LOGIN
  onSubmit(form: FormGroup) {
    const body = {
      email: form.value.email,
      password: form.value.password
    }
    if (form.valid) {
      this.auth.login(this.myForm.getRawValue()).subscribe({
        next: (u: any) => {
          this.auth.setLoggedUser(u)
          this.auth.nameUser()
          this.variable.dashboard = false
          this.route.navigateByUrl('/dashboard')
        },
        error: (err: any) => this.notValid = true
      })
    }
  }

  // CHIUSURA DIALOG
  closeError = () => {
    const dialog = document.querySelector('dialog')
    dialog?.close()
    this.notValid = false
  }
}
