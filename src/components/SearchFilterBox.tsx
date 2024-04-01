import React, { useState } from "react";
import { TimeSeriesIntervals } from "../types/TimeSeriesEnums";

type Props = {
  onClickSearch: (value: string) => void;
  timeInterval: TimeSeriesIntervals;
  onSelectTimeInterval: (value: TimeSeriesIntervals) => void;
}

export default function SearchFilterBox({ onClickSearch, timeInterval, onSelectTimeInterval }: Props) {
  const [searchKeyword, setSearchKeywords] = useState<string>("");

  return (
    <div className="w-full h-28 border-2 border-slate-400 p-4 rounded-lg flex gap-8 items-center">
      <label htmlFor="symbol" className="text-lg font-semibold text-slate-800 w-1/6">Search Stock: </label>

      <div className="w-2/3 relative flex gap-8 items-center">
        <div className="w-3/4 flex rounded-lg border-2 border-slate-400">
          <input
            className="outline-none w-full h-full p-4 bg-transparent text-slate-800"
            id="symbol"
            value={searchKeyword}
            type="text"
            onChange={(e) => setSearchKeywords(e.target.value.toUpperCase())}
            placeholder="Enter Stock Symbols"
          />
          {searchKeyword.length > 0 && (
            <button
              className="font-mono text-2xl w-10 leading-4 text-slate-600 hover:text-slate-400 rounded-full"
              type="reset"
              about="clear"
              onClick={(e) => {
                e.preventDefault();
                setSearchKeywords("");
              }}
            >
              x
            </button>
          )}
        </div>

        <div className="bg-transparent border-2 border-slate-400 w-1/4 rounded-lg pr-3">
          <select
            title="Select Time Interval"
            className="w-full h-full p-4 bg-transparent rounded-lg outline-none text-slate-800 font-semibold"
            name="Time Intervals"
            id="time-intervals"
            value={timeInterval}
            onChange={(e) => onSelectTimeInterval(e.target.value as TimeSeriesIntervals)}
          >
            <option value="" disabled>-Select Time Interval-</option>
            <option value={TimeSeriesIntervals.WEEKLY_ADJUSTED}>Weekly</option>
            <option value={TimeSeriesIntervals.MONTHLY_ADJUSTED}>Monthly</option>
          </select>
        </div>

        <p className="text-sm absolute top-14 left-2">
          Check available stock symbols&nbsp;
          <a
            className="text-slate-700 hover:underline"
            href="https://stockanalysis.com/stocks/"
            target="_blank" rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>

      <button
        className="bg-transparent border-2 border-slate-400 w-1/6 rounded-lg p-4 text-slate-800 font-semibold outline-none"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onClickSearch(searchKeyword);
        }}
      >
        Search
      </button>
    </div>
  )
}