import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/users'

  token$ = new Subject

  register = (user: any) => {
    return this.http.post<User[]>(this.url, user).subscribe({
      next: (data: any) => {
        this.token$ = data.accessToken
        console.log(this.token$)
      }
    })
  }
  authorize(body: any) {
    console.log(this.http.post(this.url, body));

    return this.http.get(this.url, body).subscribe({
      next: (data: any) => {
        const user = data.find
      }
    })
  }
}

