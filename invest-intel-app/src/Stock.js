import React from "react";

import "./App.css";
import { SYMBOL } from "./Constants";
import StockCard from "./StockCard";

const url =
  "https://investinteldatatrigger.azurewebsites.net/api/InvestIntelDataTrigger";
const options = {
  method: "GET",
};

const initialStocks = [];
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

const ListView = ({ list }) =>
  list.map((item, index) => (
    <div>
      <StockCard key={index} {...item} />
    </div>
  ));

export default Stock;
