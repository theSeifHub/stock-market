import React, { useEffect, useState } from 'react';
import LiveCandleStickChart from './components/LiveCandleStickChart';
import SearchFilterBox from './components/SearchFilterBox';
import { TimeSeriesDataKeys, TimeSeriesIntervals } from './types/TimeSeriesEnums';
import { AdjustedTimeSeriesData } from './types/GetStockDataResponse';
import getStockData from './utils/requests/getStockData';

function App() {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [timeInterval, setTimeInterval] = useState<TimeSeriesIntervals>(TimeSeriesIntervals.WEEKLY_ADJUSTED);
  const [searchNow, setSearchNow] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState<string>('Enter a stock symbol to display data.');
  const [stockData, setStockData] = useState<AdjustedTimeSeriesData>({});
  
  useEffect(() => {
    if (searchNow && stockSymbol) {
      setNoResultsMessage("Loading...");
      getStockData(stockSymbol, timeInterval)
      .then((res) => {
        let dataKey: TimeSeriesDataKeys;
        switch (timeInterval) {
          case TimeSeriesIntervals.WEEKLY_ADJUSTED:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
            break;
          case TimeSeriesIntervals.MONTHLY_ADJUSTED:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
            break;
          default:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
        }
        if (res[dataKey]) {
          setStockData(res[dataKey]);
        } else {
          setNoResultsMessage('No results found. Try another symbol.');
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setSearchNow(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchNow]);
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 py-2 px-4 md:px-32 bg-slate-300">
      <h1 className="font-mono font-bold text-slate-800 text-3xl text-center">Stock Market</h1>
      <SearchFilterBox
        onClickSearch={(val) => {
          setStockSymbol(val);
          setSearchNow(true);
        }}
        timeInterval={timeInterval}
        onSelectTimeInterval={(val) => setTimeInterval(val)}
      />
      <LiveCandleStickChart
        stockSymbol={stockSymbol}
        stockData={stockData}
        noDataMsg={noResultsMessage}
      />
    </div>
  );
}

export default App;
