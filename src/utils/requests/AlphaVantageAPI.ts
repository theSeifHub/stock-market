import { TimeSeriesIntervals } from "../../types/TimeSeriesEnums";

const apiKey = process.env.REACT_APP_API_KEY;

export const baseUrl = "https://www.alphavantage.co";

export const getSymbolSearchResults = (keywords: string) => 
  `${baseUrl}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`;

export const getTimeSeriesWeeklyAdjustedData = (symbol: string, intervalFunction: TimeSeriesIntervals) => 
  `${baseUrl}/query?function=${intervalFunction}&symbol=${symbol}&apikey=${apiKey}`;