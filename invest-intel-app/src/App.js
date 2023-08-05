import React from "react";

const url =
  "https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9c342da74bmsh13ce343e2934570p1db565jsn5c628f1c01c8",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};

const initialStocks = [
  {
    id: 1,
    symbol: "AACG",
    name: "ATA Creativity Global",
    currency: "USD",
    exchange: "NASDAQ",
    mic_code: "XNMS",
    country: "United States",
    type: "Depositary Receipt",
  },

  {
    id: 2,
    symbol: "AACI",
    name: "Armada Acquisition Corp. I",
    currency: "USD",
    exchange: "NASDAQ",
    mic_code: "XNMS",
    country: "United States",
    type: "Common Stock",
  },

  {
    id: 3,
    symbol: "AACIU",
    name: "Armada Acquisition Corp. I Unit",
    currency: "USD",
    exchange: "NASDAQ",
    mic_code: "XNMS",
    country: "United States",
    type: "Common Stock",
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

/* const getAsyncStockData = async () => {

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result
  } catch (error) {
    console.error(error);
  }
} */

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
      setStocks(jsonData.data);
    });
  }, []);

  const filteredStocks = stocks.filter((stock) => {
    return (
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <label htmlFor="searchStock">Search:</label>
    <input
      id="search"
      type="text"
      value={searchTerm}
      onChange={onSearch}
    ></input>
    <button type="submit">Search</button>
  </>
);

const Item = ({ symbol, name, currency, exchange }) => (
  <div>
    <span>symbol : {symbol}</span>
    <br />
    <span>name : {name}</span>
    <br />
    <span>currency: {currency}</span>
    <br />
    <span>exchange: {exchange}</span>
    <br />
  </div>
);

const ListView = ({ list }) =>
  list.map((item) => (
    <div>
      <Item key={item.symbol} {...item} />
      <hr />
    </div>
  ));

export default App;
