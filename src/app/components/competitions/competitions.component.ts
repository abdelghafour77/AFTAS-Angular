import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Competition } from '../../core/models/competition';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CompetitionService } from '../../core/services/competition.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../../core/models/member';
// reactive forms


@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent implements OnInit {

  competitions: Competition[] = [];
  searchControl = new FormControl();
  currentCompetition?: Competition;

  constructor(private competitionService: CompetitionService) { }
  activeStatus = 'all';
  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);

    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm.length <= 0)
        this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);
      else
        this.competitionService.searchByCriteria(searchTerm).subscribe(competitions => this.competitions = competitions);
    });
  }
  getCompetitionsByStatus(status: string) {
    this.activeStatus = status;
    if (status == 'all')
      this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);
    else
      this.competitionService.getCompetitionsByStatus(status)
        .subscribe(competitions => this.competitions = competitions);
  }
  selectCompetition(competition: Competition) {
    this.currentCompetition = competition;
  }




}
