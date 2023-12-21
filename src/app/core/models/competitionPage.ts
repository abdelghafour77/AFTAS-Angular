import { Competition } from "./competition";

export interface CompetitionPage {
      content?: Competition[];
      pageNumber: number;
      totalPages: number;

}

export class CCompetitionPage implements CompetitionPage {
      constructor(
            public pageNumber: number = 0,
            public totalPages: number = 0,
            public content?: Competition[]

      ) {

      }
}






