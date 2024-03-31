import { TickerSearchResponse } from "../../types/TickerSearchResponse";
import { getSymbolSearchResults } from "./AlphaVantageAPI";

export default async function searchTickers(keywords: string): Promise<TickerSearchResponse> {
  try {
    const response = await fetch(getSymbolSearchResults(keywords));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error >>>", error);
    throw error;
  }
}
