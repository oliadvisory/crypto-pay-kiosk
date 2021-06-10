import { Controller, Post, Route, Security, Body, Get, Path } from "tsoa";
import { Database } from "../db/context";
import { ITimePricingObj } from "./time";

@Route("time")
export class TimeController extends Controller {
  @Post("price")
  @Security("api-key")
  public async setPrice(@Body() body: ITimePricingObj) {
    await new Database().setTimePricing(body);
    this.setStatus(201);
    return;
  }
  @Get("price/{checkoutId}/{duration}")
  public async getPrice(
    @Path() checkoutId: string,
    @Path() duration: "min" | "sec"
  ): Promise<{
    checkoutId: string;
    duration: string;
    price: number;
  }> {
    const price = await new Database().getTimePricing({ checkoutId, duration });
    this.setStatus(201);
    return {
      checkoutId,
      duration,
      price,
    };
  }
}
