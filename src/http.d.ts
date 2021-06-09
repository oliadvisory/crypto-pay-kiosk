import * as express from "express";

interface Request extends express.Request {
  uid: string;
  res: Response
}
interface Response extends express.Response {
  // something custom ...
}

export interface Http {
  Request: Request;
  Response: Response;
}
