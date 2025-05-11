
import { Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { SalonDetailComponent } from '../app/pages/salon-detail/salon-detail.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'salon/:id', component: SalonDetailComponent },
  { path: 'register', component: RegisterComponent }
];
