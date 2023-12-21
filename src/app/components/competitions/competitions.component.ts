import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Competition } from '../../core/models/competition';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CompetitionService } from '../../core/services/competition.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../../core/models/member';
import { RouterLink } from '@angular/router';
import { CCompetitionPage } from '../../core/models/competitionPage';
import { PaginationComponent } from '../pagination/pagination.component';
import { Flowbite } from '../../core/config/flowbite-config';
// reactive forms


@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    FormsModule,
    PaginationComponent,
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
@Flowbite()
export class CompetitionsComponent implements OnInit {

  competitions: CCompetitionPage = new CCompetitionPage();

  searchControl = new FormControl();
  currentCompetition?: Competition;
  loading = true;
  page = 0;
  size = 5;
  search = '';



  constructor(private competitionService: CompetitionService) { }
  activeStatus = 'all';

  ngOnInit() {
    // this.pages = Array(100).fill(0).map((x, i) => i + 1);

    this.competitionService.getPaginateCompetitions(this.page).subscribe(competitions => this.competitions = competitions);

    this.searchControl.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm.length <= 0)
        this.competitionService.getPaginateCompetitions(this.page).subscribe(competitions => this.competitions = competitions);
      else
        this.competitionService.searchByCriteriaPaginate(searchTerm, this.page).subscribe(competitions => this.competitions = competitions);
    });
  }

  getCompetitionsByStatus(status: string) {
    this.page = 0;
    this.activeStatus = status;
    if (status == 'all')
      this.competitionService.getPaginateCompetitions(this.page).subscribe(competitions => this.competitions = competitions);
    else
      this.competitionService.getCompetitionsByStatusPaginate(status, this.page)
        .subscribe(competitions => this.competitions = competitions);
  }

  selectCompetition(competition: Competition) {
    this.currentCompetition = competition;
  }



  getCompetitions(page: number = 0) {
    this.page = 0;
    if (page < this.competitions.totalPages && page >= 0) {
      this.page = page;
      if (this.activeStatus == 'all')
        this.competitionService.getPaginateCompetitions(this.page).subscribe(competitions => this.competitions = competitions);
      else
        this.competitionService.getCompetitionsByStatusPaginate(this.activeStatus, this.page)
          .subscribe(competitions => this.competitions = competitions);
    }
  }



}
