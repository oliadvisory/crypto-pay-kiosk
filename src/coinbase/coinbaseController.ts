import { Controller, Post, Route, Request, Security, Body } from "tsoa";
import { IRequest } from "../http";
import { CoinbaseService } from "./coinbaseService";
import * as coinbase from "coinbase-commerce-node";

@Route("coinbase")
export class coinbaseController extends Controller {
  private coinbase = new CoinbaseService();

  @Post("webhook")
  @Security("coinbase-webhook")
  public async webhook(
    @Body() body: any,
    @Request() request: IRequest
  ) {
    const event: coinbase.EventResource = body
    this.coinbase.handleEvent(event);
    this.setStatus(201);
    return;
  }
}
