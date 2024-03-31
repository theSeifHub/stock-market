import React, { useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { CandlestickChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  GridComponent,
  TooltipComponent,
  AxisPointerComponent,
  TitleComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  DatasetComponent,
} from 'echarts/components';
import getStockData from '../utils/requests/getStockData';
import { AdjustedTimeSeriesData } from '../types/GetStockDataResponse';
import formatStockIntoSeriesData from '../utils/formatStockIntoSeriesData';
import { EChartFormattedDataItem } from '../types/FormattedStockData';
import { getEchartsOptions as getEChartsOption } from '../utils/getEChartsOption';
import { TimeSeriesIntervals, TimeSeriesDataKeys } from '../types/TimeSeriesEnums';

// Register the required components
echarts.use([
  CandlestickChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  AxisPointerComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  DatasetComponent,
  CanvasRenderer,
]);

type Props = {
  stockSymbol: string;
  seriesInterval: TimeSeriesIntervals;
};

export default function LiveCandleStickChart({stockSymbol, seriesInterval}: Props) {
  const [stockData, setStockData] = useState<AdjustedTimeSeriesData>({});

  useEffect(() => {
    if (stockSymbol) {
      getStockData(stockSymbol, seriesInterval)
      .then((res) => {
        let dataKey: TimeSeriesDataKeys;
        switch (seriesInterval) {
          case TimeSeriesIntervals.DAILY_ADJUSTED:
            dataKey = TimeSeriesDataKeys.DAILY_ADJUSTED;
            break;
          case TimeSeriesIntervals.WEEKLY_ADJUSTED:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
            break;
          case TimeSeriesIntervals.MONTHLY_ADJUSTED:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
            break;
          default:
            dataKey = TimeSeriesDataKeys.WEEKLY_ADJUSTED;
        }
        setStockData(res[dataKey])
      })
      .catch((e) => console.error(e))
      .finally(() => console.log("Stocks >> ", stockData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSymbol]);

  
  const seriesData: EChartFormattedDataItem[] = useMemo(() => formatStockIntoSeriesData(stockData), [stockData]);

  
  return (
    <div className='p-4 border-2 border-slate-400 rounded-lg h-[550px]'>
      {seriesData.length > 0 ? (
        <ReactECharts
          echarts={echarts}
          option={getEChartsOption(`${stockSymbol} Stock History`, seriesData, stockSymbol)}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '100%' }}
        />
      ) : (
        <h2 className='w-fit m-auto mt-32 text-2xl font-semibold text-slate-800 border-b-4 border-b-slate-400 p-4'>
          Enter a stock symbol to display data.
        </h2>
      )}
    </div>
  )
}