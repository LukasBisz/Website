import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { CpsComponent } from './pages/cps/cps.component';
import { sessionResolver } from './resolver/session.resolver';
import { TicTacToeComponent } from './pages/tic-tac-toe/tic-tac-toe.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { session: sessionResolver },
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { session: sessionResolver },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'cps', component: CpsComponent, canActivate: [authGuard] },
  {
    path: 'tic-tac-toe',
    component: TicTacToeComponent,
    canActivate: [authGuard],
  },
];
