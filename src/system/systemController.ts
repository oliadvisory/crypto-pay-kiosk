import { Controller, Get, Route } from "tsoa";

@Route("system")
export class SystemController extends Controller {
  @Get("ping")
  public async ping(): Promise<string> {
    this.setStatus(201)
    return "hello from server";
  }
}
