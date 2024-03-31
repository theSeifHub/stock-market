import type { EChartsOption } from 'echarts';
import { EChartFormattedDataItem } from '../types/FormattedStockData';

const bgColor = '#cccccc'


export const getEchartsOptions = (
  title: string,
  data: EChartFormattedDataItem[],
  symbol: string,
): EChartsOption => {
  const datesData: string[] = [];
  const numbersData: number[][] = [];

  data.forEach(([date, ...numbers]) => {
    datesData.push(date);
    numbersData.push(numbers);
  });

  return {
    dataset: {
      source: data
    },
    textStyle: {
      color: "#555",
      fontSize: 20,
    },
    title: {
      text: title,
      left: 70,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: [{
      left: '10%',
      right: '10%',
      bottom: "18%",
      show: true,
      backgroundColor: bgColor,
    }],
    legend: {
      data: [symbol],
      padding: 7,
    },
    xAxis: {
      type: "category",
      data: datesData,
      axisLine: {
        onZero: false
      },
      splitLine: {
        show: true
      },
      min: "dataMin",
      max: "dataMax"
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 5,
      }, {
        show: true,
        type: "slider",
        bottom: "1%",
        start: 50,
        end: 100,
        height: 60,
        backgroundColor: bgColor,
        dataBackground: {
          lineStyle: {color: '#888', type: "dashed", width: 1.5},
          areaStyle: {color: '#555'},
        }
      }
    ],
    series: [{
      name: symbol,
      type: "candlestick",
      data: numbersData,
      barMinWidth: 5,
      barMaxWidth: 80,
    }],
  }
};