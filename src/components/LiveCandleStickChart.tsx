import React, { useMemo } from 'react';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';
import { CandlestickChart } from 'echarts/charts';
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
import { AdjustedTimeSeriesData } from '../types/GetStockDataResponse';
import formatStockIntoSeriesData from '../utils/formatStockIntoSeriesData';
import { EChartFormattedDataItem } from '../types/FormattedStockData';
import { getEChartsOption } from '../utils/getEChartsOption';

// Register the required components
echarts.use([
  CandlestickChart,
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
  stockData: AdjustedTimeSeriesData;
  noDataMsg: string;
};

export default function LiveCandleStickChart({stockSymbol, stockData, noDataMsg}: Props) {
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
          {noDataMsg}
        </h2>
      )}
    </div>
  )
}