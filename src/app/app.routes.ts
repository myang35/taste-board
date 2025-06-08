import { Routes } from '@angular/router';
import { AccountComponent } from '@features/account/account.component';
import { RecipesComponent } from '@features/account/recipes/recipes.component';
import { SecurityComponent } from '@features/account/security/security.component';
import { BrowseComponent } from '@features/browse/browse.component';
import { CreateComponent } from '@features/create/create.component';
import { HomeComponent } from '@features/home/home.component';
import { LoginComponent } from '@features/login/login.component';
import { SignUpComponent } from '@features/sign-up/sign-up.component';
import { ViewComponent } from '@features/view/view.component';

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
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full',
      },
      {
        path: 'recipes',
        component: RecipesComponent,
      },
      {
        path: 'security',
        component: SecurityComponent,
      },
    ],
  },
];
