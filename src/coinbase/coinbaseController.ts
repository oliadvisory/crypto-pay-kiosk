import { Body, Controller, Get, Post, Route } from "tsoa";
import { CoinbaseTest, CoinbaseWebhook } from "./coinbase";
import { CoinbaseService } from "./coinbaseService";

@Route("coinbase")
export class coinbaseController extends Controller {
  @Get("ping")
  public async ping(): Promise<CoinbaseTest> {
    return new CoinbaseService().get("hello from coinbase controller");
  }
  @Post("webhook")
  public async webhook(
    @Body() body: CoinbaseWebhook
    | any
  ) {
    if (body.id === "00000000-0000-0000-0000-000000000000") {
      console.log("===== Test Transaction Detected =====");
    }
    console.log(body);
    this.setStatus(201); // set return status 201
    return;
  }
}
