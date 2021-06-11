import * as admin from "firebase-admin";
import _ from "lodash";
import { IPayment } from "../payment/payment";
import { ITimePricingGet, ITimePricingObj } from "../time/time";

export class Database {
  private db: admin.database.Database;
  private pricingRef: admin.database.Reference;

  constructor() {
    this.db = admin.database();
    this.pricingRef = this.db.ref(`time/price/`);
  }

  async recordPayment(payment: IPayment): Promise<void> {
    // "processing" used to indicates that payment was created,
    // downstream kiosks can now watch an update this number by 
    // incrementing it to mark the payment as received and completed.
    _.set(payment, "processing", 'pending'); 
    try {
      await this.db.ref(`payment`).push(payment);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async setTimePricing(priceObj: ITimePricingObj): Promise<void> {
    await this.pricingRef.set(priceObj);
    return;
  }

  async getTimePricing(obj: ITimePricingGet): Promise<number> {
    return await (
      await this.pricingRef
        .child(`${obj.checkoutId}/${obj.duration}`)
        .once("value")
    ).val();
  }
}
