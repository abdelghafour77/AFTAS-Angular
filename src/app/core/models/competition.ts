export interface Competition {
      id?: number;
      code?: string;
      name?: string;
      date?: Date;
      startTime?: Date;
      endTime?: Date;
      numberOfParticipants?: number;
      location?: string;
      price?: number;
      description?: string;

}

export class CCompetition implements Competition {
      constructor(
            public id?: number,
            public code?: string,
            public name?: string,
            public date?: Date,
            public startTime?: Date,
            public endTime?: Date,
            public numberOfParticipants?: number,
            public location?: string,
            public price?: number,
            public description?: string
      ) { }
}
