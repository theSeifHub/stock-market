import React, { useEffect, useRef, useState } from "react";
import searchTickers from "../utils/requests/searchTickers";
import { TickerMatch } from "../types/TickerSearchResponse";
import { TimeSeriesIntervals } from "../types/TimeSeriesEnums";

type Props = {
  onSelectSymbol: (value: string) => void;
  timeInterval: TimeSeriesIntervals;
  onSelectTimeInterval: (value: TimeSeriesIntervals) => void;
}

export default function SearchFilterBox({ onSelectSymbol, timeInterval, onSelectTimeInterval }: Props) {
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMatches, setSearchMatches] = useState<TickerMatch[]>([]);

  useEffect(() => {
    if (isSearching && (searchKeywords.length % 2 === 0)) {
      searchTickers(searchKeywords)
        .then((res) => setSearchMatches(res.bestMatches))
        .catch((e) => console.error(e))
        .finally(() => setIsSearching(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, searchKeywords]);

  const matchesListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full border-2 border-slate-400 p-4 rounded-lg flex gap-8 items-center">
      <label htmlFor="symbol" className="text-lg font-semibold text-slate-800 w-1/5">Search Stock: </label>

      <div className="w-3/5 relative">
        <div className="w-full flex rounded-lg border-2 border-slate-400">
          <input
            className="outline-none w-full h-full p-4 bg-transparent text-slate-800"
            id="symbol"
            value={searchKeywords}
            type="text"
            onChange={(e) => {
              setIsSearching(true);
              matchesListRef.current?.classList.remove("hidden");
              matchesListRef.current?.classList.add("block");
              setSearchKeywords(e.target.value);
            }}
            placeholder="Search Stock Symbols"
          />
          {searchMatches.length > 0 && (
            <button
              className="font-mono text-2xl w-10 leading-4 text-slate-600 hover:text-slate-400 rounded-full"
              type="reset"
              about="clear"
              onClick={(e) => {
                e.preventDefault();
                setIsSearching(false);
                setSearchKeywords("");
                setSearchMatches([]);
              }}
            >
              x
            </button>
          )}
        </div>

        {searchMatches.length > 0 && (
          <div className="absolute w-full p-2 mt-2 bg-slate-200 rounded-lg z-10" ref={matchesListRef}>
            <ul className="flex flex-col gap-2">
              {searchMatches.map((match) => (
                <li key={match["1. symbol"]} className="hover:bg-slate-300 w-full border-b-stone-500 rounded-lg">
                  <button
                    className="w-full p-2 text-left"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSearching(false);
                      matchesListRef.current?.classList.remove("block");
                      matchesListRef.current?.classList.add("hidden");
                      setSearchKeywords(match["1. symbol"]);
                      onSelectSymbol(match["1. symbol"]);
                    }}
                  >
                    {match["1. symbol"]} - {match["2. name"]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-transparent border-2 border-slate-400 w-1/5 rounded-lg pr-3">
        <select
          title="Select Time Interval"
          className="w-full h-full p-4 bg-transparent rounded-lg outline-none text-slate-800 font-semibold"
          name="Time Intervals"
          id="time-intervals"
          value={timeInterval}
          onChange={(e) => onSelectTimeInterval(e.target.value as TimeSeriesIntervals)}
        >
          <option value="" disabled>-Select Time Interval-</option>
          <option value={TimeSeriesIntervals.DAILY_ADJUSTED}>Daily</option>
          <option value={TimeSeriesIntervals.WEEKLY_ADJUSTED}>Weekly</option>
          <option value={TimeSeriesIntervals.MONTHLY_ADJUSTED}>Monthly</option>
        </select>
      </div>
    </div>
  )
}