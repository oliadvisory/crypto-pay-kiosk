import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { CoinbaseTest, CoinbaseWebhook } from "./coinbase";
import { CoinbaseService, CoinbaseTestParams } from "./coinbaseService";

@Route("coinbase")
export class coinbaseController extends Controller {
  @Get("test")
  public async getUser(): Promise<CoinbaseTest> {
    return new CoinbaseService().get("hello from coinbase controller");
  }
  @Post("webhook")
  public async webhook(@Body() body: CoinbaseWebhook) {
    console.log(body);
    this.setStatus(201); // set return status 201
    return;
  }
}
