import { IRequest } from "../../http";
import * as _ from "lodash";
import { IEnv } from "../../env";
import { AuthenticationError } from "../../err";
declare var process: {
  env: IEnv;
};

export const apiKey = (request: IRequest) => {
  if (!_.has(request.headers, "x-api-key")) {
    const error = "missing api key";
    new AuthenticationError(error);
    request.res.status(401).json({ message: error });
    return Promise.reject({});
  }
  // failed (return an custom error and handle via response response.ts )

  if (request.headers["x-api-key"] === process.env.api_key) {
    return Promise.resolve({});
  }

  // failed (return an custom error and handle via response response.ts )
  const error = "incorrect api key";
  new AuthenticationError(error);
  request.res.status(401).json({ message: error });
  return Promise.reject({});
};
