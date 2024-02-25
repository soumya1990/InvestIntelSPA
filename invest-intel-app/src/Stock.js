import React from "react";

import "./App.css";
import {
  SYMBOL,
  PRICE,
  CHANGE_PERCENT,
  YEAR_HIGH,
  YEAR_LOW,
} from "./Constants";
import StockCard from "./StockCard";

const url =
  "https://investinteldatatrigger.azurewebsites.net/api/InvestIntelDataTrigger";
const options = {
  method: "GET",
};

const initialStocks = [
  {
    SYMBOL: "NIFTY 50",
    OPEN: "22,290.00",
    HIGH: "22,297.50",
    LOW: "22,186.10",
    "PREV.CLOSE": "22,217.45",
    LTP: "22,212.70",
    CHNG: "-4.75",
    "%CHNG": "-0.02",
    "VOLUME(shares)": "22,59,83,194",
    "VALUE(₹Crores)": "24,616.91",
    "52WH": "22,297.50",
    "52WL": "16,828.35",
    "30D%CHNG": "4.61",
    "365D%CHNG22-Feb-2023": "26.56",
  },
  {
    SYMBOL: "BAJAJFINSV",
    OPEN: "1,596.00",
    HIGH: "1,620.90",
    LOW: "1,596.00",
    "PREV.CLOSE": "1,592.55",
    LTP: "1,616.00",
    CHNG: "23.45",
    "%CHNG": "1.47",
    "VOLUME(shares)": "11,99,419",
    "VALUE(₹Crores)": "193.14",
    "52WH": "1,741.00",
    "52WL": "1,215.00",
    "30D%CHNG": "0.64",
    "365D%CHNG22-Feb-2023": "17.02",
  },
];
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
};

const Stock = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");

  const handleSearch = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };

  const [stocks, setStocks] = React.useState(initialStocks);

  React.useEffect(() => {
    const promiseResponse = fetch(url, options);
    //debugger;
    const promiseResult = promiseResponse.then((response) => {
      //debugger;
      return response.text();
    });
    promiseResult.then((result) => {
      //debugger;
      const jsonData = JSON.parse(result);
      setStocks(jsonData);
    });
  }, []);

  const filteredStocks = stocks.filter((stock) => {
    return stock[SYMBOL].toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <SearchTitle searchTerm={searchTerm} />
      <hr />
      <ListView list={filteredStocks} />
    </div>
  );
};

const SearchTitle = (props) => {
  const strLen = props.searchTerm.trim().length;
  if (strLen) {
    return (
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    );
  } else {
    return "";
  }
};

const SearchBar = ({ searchTerm, onSearch }) => (
  <>
    <div className="search-container">
      <input
        className="search-input"
        id="search"
        type="text"
        placeholder="Search Stock..."
        value={searchTerm}
        onChange={onSearch}
      ></input>
      <button className="search-button" type="submit">
        Search
      </button>
    </div>
  </>
);

const numberWithOutComma = (num) => {
  return parseFloat(num.replace(/,/g, ""));
};

function Item(stock) {
  const low = numberWithOutComma(stock.PRICE);
  const high = numberWithOutComma(stock[YEAR_HIGH]);
  const price = numberWithOutComma(stock[PRICE]);
  const price_pos = Math.round(((price - low) / (high - low)) * 100);

  const circleposStyle = {
    left: `${price_pos}%`,
  };
  return (
    <div className={`card ${stock[CHANGE_PERCENT] > 0 ? "green" : "red"}`}>
      <div className="left-section">
        <h2>{stock[SYMBOL]}</h2>
      </div>
      <div className="middle-section">
        <p>price : {price}</p>
        <p>1Y Low : {low}</p>
        <p>1Y High : {high}</p>
      </div>
      <div className="right-section">
        <div className="graph-line">
          <div className="graph-circle" style={circleposStyle}></div>
        </div>
      </div>
    </div>
  );
}

const ListView = ({ list }) =>
  list.map((item, index) => (
    <div>
      <StockCard key={index} {...item} />
    </div>
  ));

export default Stock;
