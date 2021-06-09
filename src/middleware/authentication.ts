// see usage docs here https://github.com/lukeautry/tsoa#security
// See routes.ts for implementation of the expressAuthentication() function

import * as _ from "lodash";
import admin from "firebase-admin";
import { IRequest } from "../http";
import { AuthenticationError } from "../err";

// import { IEnv, IGlobal } from "../env";
// declare var process: {
//   env: IEnv;
// };

// declare var global: IGlobal;

export async function expressAuthentication(
  request: IRequest,
  securityName: string,
  scopes?: string[]
): Promise<{}> {
  // used by functions to get uid and email for authenticated user via auth header
  async function getFirebaseAuthToken() {
    try {
      // check if header exists
      if (_.isEmpty(request.headers["x-auth"])) {
        // missing x-auth
        throw new Error("x-auth header required to authenticate request");
      } else {
        // verify the firebase token
        const decodedToken: admin.auth.DecodedIdToken = await admin
          .auth()
          .verifyIdToken(request.headers["x-auth"] as string);

        if (!_.isEmpty(_.get(decodedToken, "uid"))) {
          request.uid = decodedToken.uid;
          return { uid: decodedToken.uid, decodedToken };
        } else {
          throw new Error("decoded token uid is empty");
        }
      }
    } catch (error) {
      // not able to verify firebase user id token
      // console.error('x-auth header as firebase auth token is not valid: ' + error)
      const e = new AuthenticationError("authentication token invalid", error);
      request.res.status(401).json({ error: e });
      return Promise.reject({});
    }
  }

  // get and set request.user.uid and request.user.email
  if (securityName === "user") {
    return await getFirebaseAuthToken();
  }

  // just a test see live.controller.ts
  if (securityName === "live_auth") {
    console.log(
      "scope is defined in controller and read at authentication.ts: ",
      scopes
    );

    // // success (via normal return)
    // return

    // failed (return an custom error and handle via response response.ts )
    const error = {
      message: "you failed authentication",
      data: { some: "thing" },
    };
    const e = new Error(JSON.stringify(error));
    request.res.status(401).json({ error: e });
    return Promise.reject({});
  }

  if (securityName === "api_key") {
    // Google Endpoints uses ESP to check permissions of the API Key
    // Therefore, if the request reaches this point in the code the
    // default response is to allow the request to continue through
    // remaining middleware.
    if (_.isEmpty(request.headers["x-api-key"])) {
      request.res.status(401).json({ error: "missing API key" });
      return Promise.reject({});
    } else {
      return { message: "API key exists. TODO: implement verification logic" };
    }
  }

  // default response to reject if not previously resolved
  const e = new AuthenticationError("failed to match security name");
  request.res.status(401).json({ error: e });
  return Promise.reject({});
}
