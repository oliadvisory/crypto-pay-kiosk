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
import { CoinbaseTest } from "./coinbase";
import { CoinbaseService, CoinbaseTestParams } from "./coinbaseService";

@Route("coinbase")
export class coinbaseController extends Controller {
  @Get("test")
  public async getUser(): Promise<CoinbaseTest> {
    return new CoinbaseService().get('hello from coinbase controller')
  }
}
