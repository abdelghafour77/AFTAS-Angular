import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: 'competition/create', component: CreateCompetitionComponent },
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'registration', component: RegistrationComponent },
      // { path: 'competition/:id', component: CreateCompetitionComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
