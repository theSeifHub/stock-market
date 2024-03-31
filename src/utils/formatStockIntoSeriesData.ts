import { EChartFormattedDataItem } from "../types/FormattedStockData";
import { AdjustedTimeSeriesData } from "../types/GetStockDataResponse";

export default function formatStockIntoSeriesData(stockData?: AdjustedTimeSeriesData): EChartFormattedDataItem[] {
  let formattedData: EChartFormattedDataItem[] = [];
  if (stockData) {
    formattedData = Object.entries(stockData).map(([date, data]) => (
      [
        date,
        +data["1. open"],
        +data["2. high"],
        +data["3. low"],
        +data["4. close"],
      ] as EChartFormattedDataItem
    ));
  }
  return formattedData;
}
