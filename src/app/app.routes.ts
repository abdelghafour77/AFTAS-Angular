import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PodiumComponent } from './components/podium/podium.component';
import { InsertResultComponent } from './components/insert-result/insert-result.component';
import { CompetitionComponent } from './components/competition/competition.component';

export const routes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: 'competition/create', component: CreateCompetitionComponent },
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'competition/:code', component: CompetitionComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'podium/:competitionCode', component: PodiumComponent },
      { path: 'result/insert', component: InsertResultComponent },
      // { path: 'competition/:id', component: CreateCompetitionComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
