import * as coinbase from "coinbase-commerce-node";
import { IEnv } from "../env";
import { CommonError } from "../err";
import { IRequest } from "../http";

declare var process: {
  env: IEnv;
};

export class CoinbaseService {
  private client = coinbase.Client;

  constructor() {
    if (process.env.coinbase_commerce_api_key) {
      this.client.init(process.env.coinbase_commerce_api_key);
    } else {
      new CommonError("missing coinbase API Key", "coinbase");
    }
  }

  verifySignature(request: IRequest) {
    console.log("trying to verify....");
    const webhook = coinbase.Webhook;
    try {
      const sharedSecret = process.env.coinbase_commerce_webhook_secret;
      webhook.verifySigHeader(
        request.rawBody,
        request.headers["x-cc-webhook-signature"],
        sharedSecret
      );
      console.log("verified success!");

      return true;
    } catch (error) {
      console.log("verification failure");
      new CommonError(
        "failed to verify coinbase webhook signature",
        "coinbase"
      );
      console.log(error);
      return false;
    }
  }
}
