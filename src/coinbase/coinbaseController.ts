import {  Controller, Post, Route, Request } from "tsoa";
import { IRequest } from "../http";
// import { CoinbaseWebhook } from "./coinbase";
import { CoinbaseService } from "./coinbaseService";

@Route("coinbase")
export class coinbaseController extends Controller {
  private coinbase = new CoinbaseService();

  @Post("webhook")
  public async webhook(
    // @Body() body: CoinbaseWebhook | any,
    @Request() request: IRequest
  ) {
    const authenticated = this.coinbase.verifySignature(request);

    if (authenticated) {
      // if (body.id === "00000000-0000-0000-0000-000000000000") {
      //   console.log("===== Test Transaction Detected =====");
      // }

      // console.log(body);
      this.setStatus(201); // set return status 201
      return;
    } else {
      this.setStatus(401);
      return;
    }
  }
}
