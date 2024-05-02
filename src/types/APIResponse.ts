export interface APIResponse {
  Item: ItemJSON;
  ResponseMetadata: ResponseMetadata;
}

export interface ItemJSON {
  margins: { S: string };
  expert_ratings: { S: string };
  rep_name: { S: string };
  dem_name: { S: string };
  poll: { S: string };
  voting_regulations: { S: string };
  avg_margin: { S: string };
  consumer_confidence_index: { S: string };
  other: { S: string };
  ind_name: { S: string };
  campaign_finance: { S: string };
  unemployment_and_inflation: { S: string };
  state_district_office: { S: string };
  demographics: { S: string };
  composition_of_congress_and_presidency: { S: string };
  weird: { S: string };
  gas_prices: { S: string };
  past_elections: { S: string };
}

export interface ResponseMetadata {
  RequestId: string;
  HTTPStatusCode: number;
  HTTPHeaders: {
    server: string;
    date: string;
    content_type: string;
    content_length: string;
    connection: string;
    x_amzn_requestid: string;
    x_amz_crc32: string;
  };
  RetryAttempts: number;
}

export interface ResponseItem {
  margins: number[];
  expert_ratings: number;
  rep_name: string;
  dem_name: string;
  poll: number;
  voting_regulations: number;
  avg_margin: number;
  consumer_confidence_index: number;
  other: number;
  ind_name: string;
  campaign_finance: number;
  unemployment_and_inflation: number;
  state_district_office: string;
  demographics: number;
  composition_of_congress_and_presidency: number;
  weird: string;
  gas_prices: number;
  past_elections: number;
}

export function parseItem(apiResponse: APIResponse): ResponseItem {
  return {
    margins: JSON.parse(apiResponse.Item.margins.S),
    expert_ratings: parseFloat(apiResponse.Item.expert_ratings.S),
    rep_name: apiResponse.Item.rep_name.S,
    dem_name: apiResponse.Item.dem_name.S,
    poll: parseFloat(apiResponse.Item.poll.S),
    voting_regulations: parseFloat(apiResponse.Item.voting_regulations.S),
    avg_margin: parseFloat(apiResponse.Item.avg_margin.S),
    consumer_confidence_index: parseFloat(
      apiResponse.Item.consumer_confidence_index.S
    ),
    other: parseFloat(apiResponse.Item.other.S),
    ind_name: apiResponse.Item.ind_name.S,
    campaign_finance: parseFloat(apiResponse.Item.campaign_finance.S),
    unemployment_and_inflation: parseFloat(
      apiResponse.Item.unemployment_and_inflation.S
    ),
    state_district_office: apiResponse.Item.state_district_office.S,
    demographics: parseFloat(apiResponse.Item.demographics.S),
    composition_of_congress_and_presidency: parseFloat(
      apiResponse.Item.composition_of_congress_and_presidency.S
    ),
    weird: apiResponse.Item.weird.S == "nan" ? "" : apiResponse.Item.weird.S,
    gas_prices: parseFloat(apiResponse.Item.gas_prices.S),
    past_elections: parseFloat(apiResponse.Item.past_elections.S),
  };
}
