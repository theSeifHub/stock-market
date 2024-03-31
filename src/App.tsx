import React, { useState } from 'react';
import LiveCandleStickChart from './components/LiveCandleStickChart';
import SearchFilterBox from './components/SearchFilterBox';
import { TimeSeriesIntervals } from './types/TimeSeriesEnums';

function App() {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [timeInterval, setTimeInterval] = useState<TimeSeriesIntervals>(TimeSeriesIntervals.WEEKLY_ADJUSTED);
  
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 py-2 px-32 bg-slate-300">
      <h1 className="font-mono font-bold text-slate-800 text-3xl text-center">Stock Market</h1>
      <SearchFilterBox
        onSelectSymbol={(val) => setStockSymbol(val)}
        timeInterval={timeInterval}
        onSelectTimeInterval={(val) => setTimeInterval(val)}
      />
      <LiveCandleStickChart stockSymbol={stockSymbol} seriesInterval={timeInterval} />
    </div>
  );
}

export default App;
