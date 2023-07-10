import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isSideBarOpen: boolean = true

  openSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen
  }
}
