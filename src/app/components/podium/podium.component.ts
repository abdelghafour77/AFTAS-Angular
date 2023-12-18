import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../../core/services/competition.service';
import { Ranking } from '../../core/models/ranking';



@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css'
})
export class PodiumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService, private router: Router) { }


  code: string = '';
  topThree: Ranking[] = [];
  ngOnInit(): void {
    this.code = this.route.snapshot.params['competitionCode'];
    // console.log(this.code);
    this.loadPodium();
  }

  loadPodium() {
    this.competitionService.getTopThree(this.code).subscribe(topThree => this.topThree = topThree);
  }

}


