export interface Hunting {
      competitionId?: number,
      memberId?: number,
      fishId?: number,
      weightOfHuntedFish?: number
}
export class CHunting implements Hunting {
      constructor(
            public competitionId?: number,
            public memberId?: number,
            public fishId?: number,
            public weightOfHuntedFish?: number
      ) { }
}
