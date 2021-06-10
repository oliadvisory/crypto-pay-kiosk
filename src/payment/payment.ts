import _ from "lodash";
import { Database, IPayment } from "../db/context";

export class Payment {
  private db: Database;
  constructor() {
    this.db = new Database();
  }

  async paymentCrypto(
    usd: number,
    checkoutId: string,
    receivedAt: number,
    crypto?: {
      id: string;
      asset: string;
      amount: number;
    }
  ) {
    return await this.payment({
      kind: "crypto",
      usd: usd,
      checkoutId,
      receivedAt,
      crypto,
    });
  }

  async paymentCash(usd: number, checkoutId: string, receivedAt: number) {
    return await this.payment({
      kind: "cash",
      usd: usd,
      checkoutId,
      receivedAt,
    });
  }

  async paymentCard(usd: number, checkoutId: string, receivedAt: number) {
    return await this.payment({
      kind: "card",
      usd: usd,
      checkoutId,
      receivedAt,
    });
  }

  private async payment(payment: IPayment) {
    await this.db.recordPayment(payment);
    return;
  }
}
