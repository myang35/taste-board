import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  }
];
