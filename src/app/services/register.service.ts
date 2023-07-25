import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoggedUser, Login, Register } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/'

  $token = new Subject
  username: string = ''
  loginStatus = false


  loginLogout = () => {
    if (localStorage.getItem('user')) this.loginStatus = true
    else this.loginStatus = false
  }
  nameUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const name = JSON.parse(storedUser)
      this.username = name.user.username
    }
  }

  register = (user: Register): Observable<LoggedUser> => {
    return this.http.post<LoggedUser>(this.url + "users", user)
  }

  login = (user: Login): Observable<LoggedUser> => {
    return this.http.post<LoggedUser>(this.url + "login", user)
  }

  setLoggedUser = (user: LoggedUser) => localStorage.setItem('user', JSON.stringify(user))

  getLoggedUser = (): LoggedUser | null => {
    const userStorage = localStorage.getItem("user")
    if (userStorage) {
      return JSON.parse(userStorage) as LoggedUser
    }
    return null
  }
}


