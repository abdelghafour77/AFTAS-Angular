import { Ranking } from "./ranking";

export interface Member {
      id: number;
      firstName?: string;
      lastName?: string;
      accessionDate?: Date;
      nationality?: string;
      identityDocumentType?: number;
      identityNumber?: string;
      rankings?: Ranking[];
}

export class CMember implements Member {
      constructor(
            public id: number,
            public firstName?: string,
            public lastName?: string,
            public accessionDate?: Date | undefined,
            public nationality?: string | undefined,
            public identityDocumentType?: number | undefined,
            public identityNumber?: string | undefined,
            public rankings?: Ranking[] | undefined,
      ) { }
}
