export interface CoinbaseTest {
  testStr: string;
}

interface CoinbaseWebhookTimeline {
  time: string; // "2017-01-31T20:49:02Z",
  status: string; // "NEW"
}

export interface CoinbaseWebhook {
  id: string; // 00000000-0000-0000-0000-000000000000,
  attempt_number: number;
  scheduled_for: string; // "2017-01-31T20:50:02Z",
  event: {
    id: string; // "24934862-d980-46cb-9402-43c81b0cdba6",
    resource: string; // "event",
    type: string; // "charge:created",
    api_version: string; // "2018-03-22",
    created_at: string; // "2017-01-31T20:49:02Z",
    data: {
      code: string; // "66BEOV2A",
      name: string; // "The Sovereign Individual",
      description: string; // "Mastering the Transition to the Information Age",
      hosted_url: string; // "https://commerce.coinbase.com/charges/66BEOV2A",
      created_at: string; // "2017-01-31T20:49:02Z",
      expires_at: string; // "2017-01-31T21:49:02Z",
      timeline: CoinbaseWebhookTimeline[];
      metadata: {};
      pricing_type: string; // "no_price",
      payments: any[];
      addresses: {
        bitcoin: string; // "mymZkiXhQNd6VWWG7VGSVdDX9bKmviti3U",
        ethereum: string; // "0x419f91df39951fd4e8acc8f1874b01c0c78ceba6"
      };
    };
  };
}
