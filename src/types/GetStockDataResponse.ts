import { TimeSeriesDataKeys } from "./TimeSeriesEnums";

interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
};

export interface AdjustedTimeSeriesData {
  // key is a date string. e.g. "2024-03-15"
  [key: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. adjusted close": string;
    "6. volume": string;
    "7. dividend amount": string;
  };
}

export interface GetStockDataResponse {
  "Meta Data": MetaData;
  [TimeSeriesDataKeys.WEEKLY_ADJUSTED]: AdjustedTimeSeriesData;
  [TimeSeriesDataKeys.MONTHLY_ADJUSTED]: AdjustedTimeSeriesData;
  "Information"?: string;
}
