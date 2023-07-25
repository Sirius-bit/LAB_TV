import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesComponentService {

  constructor() { }

  searchBar$ = new BehaviorSubject<boolean>(false)
  footer$ = new BehaviorSubject<boolean>(false)
  buttonToggle$ = new BehaviorSubject<boolean>(true)
  navbar$ = new BehaviorSubject<boolean>(true)
  showMore: boolean = false
  dashboard: boolean = true
}
