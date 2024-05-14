import { v4 as uuidv4 } from "uuid";

export interface RequestData {
  url: string;
  body: any;
  method: string;
  headers: [string, string][];
  query : Record<string, string | undefined>;
  bodyPara : Record<string, string | undefined>;
}
// export class Dump {
//   name: string;
//   requests: RequestData[];

//   constructor() {
//     this.name = uuidv4();
//     this.requests = [];
//   }

//   addRequest(request: RequestData): void {
//     this.requests.push(request);
//   }
// }
export interface Dump {
    name: string;
    requests: RequestData[];
    mockResponse: {}
  }
  
  export const newDump = (): Dump => ({
    name: uuidv4(),
    requests: [],
    mockResponse:{}
  });
  
  export const addRequest = (dump: Dump, request: RequestData): Dump => ({
  ...dump,
  requests: [request, ...dump.requests],
});

  export const addMock = (dump: Dump, mock:{}): Dump =>({
    ...dump,
    mockResponse : mock
  })
