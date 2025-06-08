import { Routes } from '@angular/router';
import { BrowseComponent } from '@features/browse/browse.component';
import { CreateComponent } from '@features/create/create.component';
import { ViewComponent } from '@features/view/view.component';
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
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'view/:recipeId',
    component: ViewComponent,
  },
];
