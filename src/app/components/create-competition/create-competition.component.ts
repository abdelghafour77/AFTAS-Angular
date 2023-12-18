import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CompetitionService } from '../../core/services/competition.service';
import { CommonModule } from '@angular/common';
import { CCompetition, Competition } from '../../core/models/competition';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-competition',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-competition.component.html',
  styleUrl: './create-competition.component.css'
})
export class CreateCompetitionComponent {
  competitions: Competition[] = [];
  toSave: Competition = new CCompetition();

  constructor(private competitionService: CompetitionService, private router: Router) { }

  onSubmit() {
    this.competitionService.createCompetition(this.toSave).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/competitions']);
      },
      error: (err) => { console.log(err) }
    })
  }

  onSuccessSave(competition?: Competition) {
    if (competition) {
      this.competitions.push(competition);
    }
  }


}
