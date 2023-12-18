import { publishFacade } from "@angular/compiler";
import { Ranking } from "./ranking";

export interface Competition {
      id?: number;
      code?: string;
      name?: string;
      date?: Date;
      startTime?: Date;
      endTime?: Date;
      numberOfParticipants?: number;
      numberOfParticipantsRegistered?: number;
      location?: string;
      status?: string;
      price?: number;
      description?: string;
      rankings?: Ranking[];

}

export class CCompetition implements Competition {
      constructor(
            public id?: number,
            public code?: string,
            public name?: string,
            public date?: Date,
            public startTime?: Date,
            public endTime?: Date,
            public status?: string,
            public numberOfParticipantsRegistered?: number,
            public numberOfParticipantsMax?: number,
            public location?: string,
            public price?: number,
            public description?: string,
            public ranking?: Ranking[]
      ) { }
}
