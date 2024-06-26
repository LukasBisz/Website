import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CpsComponent } from './pages/cps/cps.component';
import { TicTacToeComponent } from './pages/tic-tac-toe/tic-tac-toe.component';
import { GamesComponent } from './pages/games/games.component';
import { CvComponent } from './pages/cv/cv.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  { path: 'cps', component: CpsComponent },
  {
    path: 'tic-tac-toe',
    component: TicTacToeComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'cv',
    component: CvComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
