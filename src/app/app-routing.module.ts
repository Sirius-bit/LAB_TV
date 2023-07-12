import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { SearchedMovieComponent } from './components/searched-movie/searched-movie.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'film-details', component: FilmDetailsComponent },
  { path: 'films-list', component: FilmsListComponent },
  { path: 'searched-movie', component: SearchedMovieComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
