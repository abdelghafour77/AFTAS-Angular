import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';

export const routes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: 'competition/create', component: CreateCompetitionComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
