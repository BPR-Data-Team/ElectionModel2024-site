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
  campaign_finance: { S: string };
  unemployment_and_inflation: { S: string };
  state_district_office: { S: string };
  state: { S: string };
  district: { S: string };
  office_type: { S: string };
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
  campaign_finance: number;
  unemployment_and_inflation: number;
  state_district_office: string;
  state: string;
  district: number;
  office_type: string;
  demographics: number;
  composition_of_congress_and_presidency: number;
  weird: string;
  gas_prices: number;
  past_elections: number;
}

export function parseItem(apiResponse: APIResponse): ResponseItem {
  if (!apiResponse.Item) {
    throw new Error(
      `API response with status code ${apiResponse.ResponseMetadata.HTTPStatusCode} is missing Item field`
    );
  }
  const requiredFields: string[] = [
    "margins",
    "expert_ratings",
    "rep_name",
    "dem_name",
    "poll",
    "voting_regulations",
    "avg_margin",
    "consumer_confidence_index",
    "other",
    "campaign_finance",
    "unemployment_and_inflation",
    "state_district_office",
    "state",
    "district",
    "office_type",
    "demographics",
    "composition_of_congress_and_presidency",
    "weird",
    "gas_prices",
    "past_elections",
  ];
  for (const field of requiredFields) {
    if (!apiResponse.Item.hasOwnProperty(field)) {
      throw new Error(`API response is missing required field: ${field}`);
    }
  }
  let responseItem: ResponseItem = {
    margins: [],
    expert_ratings: 0,
    rep_name: "",
    dem_name: "",
    poll: 0,
    voting_regulations: 0,
    avg_margin: 0,
    consumer_confidence_index: 0,
    other: 0,
    campaign_finance: 0,
    unemployment_and_inflation: 0,
    state_district_office: "",
    state: "",
    district: 0,
    office_type: "",
    demographics: 0,
    composition_of_congress_and_presidency: 0,
    weird: "",
    gas_prices: 0,
    past_elections: 0,
  };
  if (apiResponse.Item.margins.S != "nan") {
    responseItem.margins = JSON.parse(apiResponse.Item.margins.S);
  }
  if (apiResponse.Item.expert_ratings.S != "nan") {
    responseItem.expert_ratings = parseFloat(apiResponse.Item.expert_ratings.S);
  }
  responseItem.rep_name = apiResponse.Item.rep_name.S;
  responseItem.dem_name = apiResponse.Item.dem_name.S;
  if (apiResponse.Item.poll.S != "nan") {
    responseItem.poll = parseFloat(apiResponse.Item.poll.S);
  }
  if (apiResponse.Item.voting_regulations.S != "nan") {
    responseItem.voting_regulations = parseFloat(
      apiResponse.Item.voting_regulations.S
    );
  }
  if (apiResponse.Item.avg_margin.S != "nan") {
    responseItem.avg_margin = parseFloat(apiResponse.Item.avg_margin.S);
  }
  if (apiResponse.Item.consumer_confidence_index.S != "nan") {
    responseItem.consumer_confidence_index = parseFloat(
      apiResponse.Item.consumer_confidence_index.S
    );
  }
  if (apiResponse.Item.other.S != "nan") {
    responseItem.other = parseFloat(apiResponse.Item.other.S);
  }
  if (apiResponse.Item.campaign_finance.S != "nan") {
    responseItem.campaign_finance = parseFloat(
      apiResponse.Item.campaign_finance.S
    );
  }
  if (apiResponse.Item.unemployment_and_inflation.S != "nan") {
    responseItem.unemployment_and_inflation = parseFloat(
      apiResponse.Item.unemployment_and_inflation.S
    );
  }
  responseItem.state_district_office = apiResponse.Item.state_district_office.S;
  responseItem.state = apiResponse.Item.state.S;
  if (apiResponse.Item.district.S != "nan") {
    responseItem.district = parseFloat(apiResponse.Item.district.S);
  }
  responseItem.office_type = apiResponse.Item.office_type.S;
  if (apiResponse.Item.demographics.S != "nan") {
    responseItem.demographics = parseFloat(apiResponse.Item.demographics.S);
  }
  if (apiResponse.Item.composition_of_congress_and_presidency.S != "nan") {
    responseItem.composition_of_congress_and_presidency = parseFloat(
      apiResponse.Item.composition_of_congress_and_presidency.S
    );
  }
  responseItem.weird =
    apiResponse.Item.weird.S == "nan" ? "" : apiResponse.Item.weird.S;
  if (apiResponse.Item.gas_prices.S != "nan") {
    responseItem.gas_prices = parseFloat(apiResponse.Item.gas_prices.S);
  }
  if (apiResponse.Item.past_elections.S != "nan") {
    responseItem.past_elections = parseFloat(apiResponse.Item.past_elections.S);
  }
  return responseItem;
}
