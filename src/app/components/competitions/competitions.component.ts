import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Competition } from '../../core/models/competition';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CompetitionService } from '../../core/services/competition.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// reactive forms


@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [ReactiveFormsModule
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent implements OnInit {

  competitions: Competition[] = [];
  searchControl = new FormControl();

  constructor(private competitionService: CompetitionService) { }

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



}
