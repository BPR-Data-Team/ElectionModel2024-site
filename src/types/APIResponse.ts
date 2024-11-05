export interface APIResponse {
  Item: ItemJSON;
  ResponseMetadata: ResponseMetadata;
}

export interface ItemJSON {
  std: { S: string };
  expert_ratings: { S: string };
  rep_name: { S: string };
  poll: { S: string };
  democrat_winning_num: { S: string };
  state: { S: string };
  campaign_finance: { S: string };
  unemployment_and_inflation: { S: string };
  composition_of_congress_and_presidency: { S: string };
  weird: { S: string };
  past_elections: { S: string };
  dem_name: { S: string };
  bin_edges: { S: string };
  voting_regulations: { S: string };
  avg_margin: { S: string };
  consumer_confidence_index: { S: string };
  other: { S: string };
  republican_winning_num: { S: string };
  tie_num: { S: string };
  office_type: { S: string };
  bins: { S: string };
  district: { S: string };
  state_district_office: { S: string };
  demographics: { S: string };
  bin_bounds: { S: string };
  gas_prices: { S: string };
  campaign: { S: string };
  use_campaign: { BOOL: boolean };
  live_prediction_dem_percent: { S: string };
  live_prediction_rep_percent: { S: string };
  live_prediction_tie_percent: { S: string };
  is_called: {S: string };
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
  std: number;
  expert_ratings: number;
  rep_name: string;
  dem_name: string;
  poll: number;
  democrat_winning_num: number;
  state: string;
  campaign_finance: number;
  unemployment_and_inflation: number;
  composition_of_congress_and_presidency: number;
  weird: string;
  past_elections: number;
  bin_edges: number[];
  voting_regulations: number;
  avg_margin: number;
  consumer_confidence_index: number;
  other: number;
  republican_winning_num: number;
  tie_num: number;
  office_type: string;
  bins: number[];
  district: number;
  state_district_office: string;
  demographics: number;
  bin_bounds: [number, number];
  gas_prices: number;
  finance_array: number[];
  use_campaign: boolean;
  live_prediction_dem_percent: number;
  live_prediction_rep_percent: number;
  live_prediction_tie_percent: number;
  is_called: string;
}

export function parseItem(apiResponse: APIResponse): ResponseItem {
  if (!apiResponse.Item) {
    throw new Error(
      `API response with status code ${apiResponse.ResponseMetadata.HTTPStatusCode} is missing Item field`
    );
  }

  const requiredFields: string[] = [
    "std",
    "expert_ratings",
    "rep_name",
    "dem_name",
    "poll",
    "democrat_winning_num",
    "state",
    "campaign_finance",
    "unemployment_and_inflation",
    "composition_of_congress_and_presidency",
    "weird",
    "past_elections",
    "bin_edges",
    "voting_regulations",
    "avg_margin",
    "consumer_confidence_index",
    "other",
    "republican_winning_num",
    "tie_num",
    "office_type",
    "bins",
    "district",
    "state_district_office",
    "demographics",
    "bin_bounds",
    "gas_prices",
    "campaign",
    "use_campaign",
    "live_prediction_dem_percent",
    "live_prediction_rep_percent",
    "live_prediction_tie_percent",
    "is_called",
  ];

  const missingFields: string[] = requiredFields.filter(
    (field) => !apiResponse.Item.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    throw new Error(
      `API response is missing the following required fields: ${missingFields.join(
        ", "
      )}`
    );
  }

  let responseItem: ResponseItem = {
    std:
      apiResponse.Item.std.S === "nan" ? 0 : parseFloat(apiResponse.Item.std.S),
    expert_ratings:
      apiResponse.Item.expert_ratings.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.expert_ratings.S),
    rep_name: apiResponse.Item.rep_name.S,
    dem_name: apiResponse.Item.dem_name.S,
    poll:
      apiResponse.Item.poll.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.poll.S),
    democrat_winning_num:
      apiResponse.Item.democrat_winning_num.S === "nan"
        ? 0
        : parseInt(apiResponse.Item.democrat_winning_num.S),
    state: apiResponse.Item.state.S,
    campaign_finance:
      apiResponse.Item.campaign_finance.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.campaign_finance.S),
    unemployment_and_inflation:
      apiResponse.Item.unemployment_and_inflation.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.unemployment_and_inflation.S),
    composition_of_congress_and_presidency:
      apiResponse.Item.composition_of_congress_and_presidency.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.composition_of_congress_and_presidency.S),
    weird: apiResponse.Item.weird.S === "nan" ? "" : apiResponse.Item.weird.S,
    past_elections:
      apiResponse.Item.past_elections.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.past_elections.S),
    bin_edges: JSON.parse(apiResponse.Item.bin_edges.S),
    voting_regulations:
      apiResponse.Item.voting_regulations.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.voting_regulations.S),
    avg_margin:
      apiResponse.Item.avg_margin.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.avg_margin.S),
    consumer_confidence_index:
      apiResponse.Item.consumer_confidence_index.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.consumer_confidence_index.S),
    other:
      apiResponse.Item.other.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.other.S),
    republican_winning_num:
      apiResponse.Item.republican_winning_num.S === "nan"
        ? 0
        : parseInt(apiResponse.Item.republican_winning_num.S),
    tie_num:
      apiResponse.Item.tie_num.S === "nan"
        ? 0
        : parseInt(apiResponse.Item.tie_num.S),
    office_type: apiResponse.Item.office_type.S,
    bins: JSON.parse(apiResponse.Item.bins.S),
    district:
      apiResponse.Item.district.S === "nan"
        ? 0
        : parseInt(apiResponse.Item.district.S),
    state_district_office: apiResponse.Item.state_district_office.S,
    demographics:
      apiResponse.Item.demographics.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.demographics.S),
    bin_bounds: JSON.parse(
      apiResponse.Item.bin_bounds.S.replace("(", "[").replace(")", "]")
    ),
    gas_prices:
      apiResponse.Item.gas_prices.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.gas_prices.S),
    finance_array:
      apiResponse.Item.campaign.S === "nan"
        ? 0
        : JSON.parse(apiResponse.Item.campaign.S),
    use_campaign: apiResponse.Item.use_campaign.BOOL,
    live_prediction_dem_percent:
      apiResponse.Item.live_prediction_dem_percent.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.live_prediction_dem_percent.S),
    live_prediction_rep_percent:
      apiResponse.Item.live_prediction_rep_percent.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.live_prediction_rep_percent.S),
    live_prediction_tie_percent:
      apiResponse.Item.live_prediction_tie_percent.S === "nan"
        ? 0
        : parseFloat(apiResponse.Item.live_prediction_tie_percent.S),
    is_called:
      apiResponse.Item.is_called.S === "nan"
        ? ""
        : apiResponse.Item.is_called.S,
  };

  return responseItem;
}
