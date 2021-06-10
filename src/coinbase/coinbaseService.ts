import * as coinbase from "coinbase-commerce-node";
import { IEnv } from "../env";
import { CommonError } from "../err";

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

  handleEvent(event: coinbase.EventResource) {
    if (event.type === "charge:pending") {
      console.log('is a charge:pending');
    } else{
      console.log('is another event');
    }
  }
}
