import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggedUser } from 'src/app/interfaces/user';
import { RegisterService } from 'src/app/services/register.service';
import { VariablesComponentService } from 'src/app/services/variables-component.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(protected button_v: VariablesComponentService,
    private fb: FormBuilder,
    private user: RegisterService
  ) {
    this.button_v.buttonToggle$.next(false)
  }

  myForm: any

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8),]],
      checkbox: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid)
    console.log('Email', form.value.email)
    console.log('password', form.value.password)
    console.log('repeat-password', form.value.repeatPassword)
    const body = {
      email: form.value.email,
      password: form.value.password,
      repeatPassword: form.value.repeatPassword
    }
    console.log(body)
    this.user.register(body).subscribe({
      next: (data: LoggedUser) => {
        console.log(data)
      }
    })
  }
}
