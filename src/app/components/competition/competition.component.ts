import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompetitionService } from '../../core/services/competition.service';
import { CCompetition, Competition } from '../../core/models/competition';
import { CMember, Member } from '../../core/models/member';
import { Ranking } from '../../core/models/ranking';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CHunting, Hunting } from '../../core/models/hunting';
import { HuntingService } from '../../core/services/hunting.service';
import { NotificationService } from '../../core/services/notification.service';
import { Fish } from '../../core/models/fish';
import { FishService } from '../../core/services/fish.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Flowbite } from '../../core/config/flowbite-config';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
@Flowbite()
export class CompetitionComponent implements OnInit {

  toSave: Hunting = new CHunting();
  code: string = '';
  members: Member[] = [];
  ranking: Ranking[] = [];
  fishes: Fish[] = [];
  competition: Competition = new CCompetition();
  member: Member = new CMember(0);
  memberId?: number;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private huntingService: HuntingService,
    private fishService: FishService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.params['code'];
    this.fishService.getFishes().subscribe(
      fishes => this.fishes = fishes,
      HttpErrorResponse => this.notificationService.show(HttpErrorResponse.error, 'error')
    );
    this.loadMembers();


  }
  setMember(memberId: number) {
    this.memberId = memberId;
  }
  loadMembers() {
    this.competitionService.getCompetition(this.code).subscribe(
      competition => {
        this.competition = competition;
        // console log json stringified
        // console.log(JSON.stringify(this.competition.rankings));
        // console.log(this.competition.jso);
        // this.ranking = competition.ranking;
        // this.members = this.ranking.map(r => r.member);
      }
    );
  };
  onSubmit() {
    this.toSave.competitionId = this.competition.id;
    this.toSave.memberId = this.memberId;

    this.huntingService.createHunting(this.toSave).subscribe(

      (data) => {
        console.log(data);
        this.loadMembers();
        // this.router.navigate(['/registration']);
        // this.getMembersNotRegistered();
      },
      (HttpErrorResponse) => {
        this.notificationService.show(HttpErrorResponse.error, "error")
        console.log("Development Purpose Error :" + HttpErrorResponse.error)

      }
    )
  }

}
