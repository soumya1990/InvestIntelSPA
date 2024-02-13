import React from "react";

import './App.css';

const url =
  "https://investinteldatatrigger.azurewebsites.net/api/InvestIntelDataTrigger";
const options = {
  method: "GET"
};

const initialStocks = [
    {
      "SYMBOL ": "NIFTY 50",
      "OPEN ": "21,727.00",
      "HIGH ": "21,804.45",
      "LOW ": "21,629.90",
      "PREV. CLOSE ": "21,717.95",
      "LTP ": "21,782.50",
      "CHNG ": "64.55",
      "%CHNG ": "0.30",
      "VOLUME (shares)": "34,92,22,850",
      "VALUE  (₹ Crores)": "31,175.97",
      "52W H ": "22,126.80",
      "52W L ": "16,828.35",
      "30 D   %CHNG ": "0.76",
      "365 D % CHNG  09-Feb-2023": "21.73"
    },

    {
      "SYMBOL ": "GRASIM",
      "OPEN ": "2,057.25",
      "HIGH ": "2,182.00",
      "LOW ": "2,046.90",
      "PREV. CLOSE ": "2,057.30",
      "LTP ": "2,179.05",
      "CHNG ": "121.75",
      "%CHNG ": "5.92",
      "VOLUME (shares)": "20,10,089",
      "VALUE  (₹ Crores)": "428.45",
      "52W H ": "2,182.05",
      "52W L ": "1,527.05",
      "30 D   %CHNG ": "4.83",
      "365 D % CHNG  09-Feb-2023": "31.95"
    }
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


const App = () => {
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
    return (
      stock["SYMBOL "].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div>
      <h1>Stock List</h1>
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
    <input className="search-input" 
      id="search"
      type="text"
      placeholder="Search Stock..."
      value={searchTerm}
      onChange={onSearch}
    ></input>
    <button className="search-button" type="submit">Search</button>
    </div>
  </>
);

const Item = (stock) => (
  <div className={`card ${stock["%CHNG "] > 0 ? 'green' : 'red'}`}>
    <span className="card-title"> {stock["SYMBOL "]}</span>
    <br />
    <span className="card-content">LTP : {stock["LTP "]}</span>
    <br />
    <span className="card-content">52W H : {stock["52W H "]}</span>
    <br />
    <span className="card-content">52W L : {stock["52W L "]}</span>
    <br />
  </div>
);

const ListView = ({ list }) =>
  list.map((item, index) => (
    <div>
      <Item key={index} {...item} />
    </div>
  ));

export default App;
