import { CoinbaseTest } from "./coinbase";

// A post request should not contain an id.
export type CoinbaseTestParams = Pick<CoinbaseTest, "testStr">;

export class CoinbaseService {
  public get(testStr: string): CoinbaseTest {
    return {
      testStr,
    };
  }  
}
