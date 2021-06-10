export interface ITimePricingObj {
  // checkoutId identifying item (eg: carwash bay 1)
  [checkoutId: string]: {
    min: number;
  };
}

export interface ITimePricingGet {
  checkoutId: string;
  duration: "min" | "sec";
}
