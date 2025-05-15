import { Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { SalonDetailComponent } from '../app/pages/salon-detail/salon-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { SalonCreateComponent } from './pages/salon-create/salon-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'salon/:id', component: SalonDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'salon/:id/appointments', component: AppointmentsComponent },
  { path: 'create', component: SalonCreateComponent },
];
