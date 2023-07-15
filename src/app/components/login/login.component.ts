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
    private buttonToggle_v: VariablesComponentService,
    private fb: FormBuilder,
    private auth: RegisterService
  ) {
    this.buttonToggle_v.buttonToggle$.next(false)
  }

  myForm: any

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(form: FormGroup) {
    const body = {
      email: form.value.email,
      password: form.value.password
    }

    if (form.valid) {
      this.auth.login(this.myForm.getRawValue()).subscribe(u => {
        this.auth.setLoggedUser(u)
        this.route.navigateByUrl('/dashboard')
        console.log(u)
        console.log('Valid?', form.valid); // true or false
        console.log('Email', form.value.email)
        console.log('password', form.value.password)
      })
    }
  }
}
