import { GetStockDataResponse } from "../../types/GetStockDataResponse";
import { TimeSeriesIntervals } from "../../types/TimeSeriesEnums";
import { getTimeSeriesWeeklyAdjustedData } from "./AlphaVantageAPI";

export default async function getStockData(stockSymbol: string, intervalFunction: TimeSeriesIntervals): Promise<GetStockDataResponse> {
  try {
    const response = await fetch(getTimeSeriesWeeklyAdjustedData(stockSymbol, intervalFunction));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error >>>", error);
    throw error;
  }
}
