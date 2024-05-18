export interface RequestData {
  url: string;
  body: any;
  method: string;
  headers: [string, string][];
  query: Record<string, string | undefined>;
  bodyPara: Record<string, string | undefined>;
}

export interface Dump {
  name: string;
  requests: RequestData[];
  mockResponse: {};
}
