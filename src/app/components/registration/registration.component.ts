import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../core/services/member.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CompetitionService } from '../../core/services/competition.service';
import { CMember, Member } from '../../core/models/member';
import { Competition } from '../../core/models/competition';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  toSave: Member = new CMember(1);
  selectedCompetition: string = '';
  searchControl = new FormControl();
  members: Member[] = [];
  competitions: Competition[] = [];

  constructor(private memberService: MemberService, private competitionService: CompetitionService, private router: Router) { }

  onSubmit() {
    this.memberService.createMember(this.toSave).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/registration']);
        this.getMembersNotRegistered();
      },
      error: (err) => { console.log(err) }
    })
  }

  onSuccessSave(competition?: Competition) {
    if (competition) {
      this.competitions.push(competition);
    }
  }


  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);


    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm.length <= 0)
        this.getMembersNotRegistered();
      else
        this.competitionService.getMembersNotRegisterdWithSearch(this.selectedCompetition, searchTerm).subscribe(members => this.members = members);
    });

  }
  registerMember(memberId: number) {
    this.competitionService.registerMemberToCompetition(this.selectedCompetition, memberId)
      .subscribe(competition => {
        this.competitionService.getCompetitions().subscribe(competitions => this.competitions = competitions);
        this.getMembersNotRegistered();
      });
  }
  getMembersNotRegistered() {
    this.competitionService.getMembersNotRegistered(this.selectedCompetition)
      .subscribe(members => this.members = members);
  }

}
