import { Ranking } from "./ranking";

export interface Member {
      id: number;
      firstName?: string;
      lastName?: string;
      accessionDate?: Date;
      nationality?: string;
      identityDocumentType?: string;
      identityNumber?: string;
      rankings: Ranking[];
}
