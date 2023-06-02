import React from "react";

const stockList = [
  {
    id: 1,
    symbol: "INFY",
    price: 1322.0,
    lotsize: 400,
  },

  {
    id: 2,
    symbol: "HDFCBANK",
    price: 1122.0,
    lotsize: 250,
  },

  {
    id: 3,
    symbol: "HCLTECH",
    price: 1145.0,
    lotsize: 250,
  },

  {
    id: 4,
    symbol: "RELIANCE",
    price: 2000.0,
    lotsize: 300,
  },

  {
    id: 5,
    symbol: "TCS",
    price: 3300.0,
    lotsize: 200,
  },

  {
    id: 6,
    symbol: "Asian Paints",
    price: 3250.0,
    lotsize: 150,
  },

  {
    id: 7,
    symbol: "WIPRO",
    price: 409,
    lotsize: 300,
  },

  {
    id: 8,
    symbol: "HDFC",
    price: 2655,
    lotsize: 300,
  },

  {
    id: 9,
    symbol: "Divis Lab",
    price: 3554,
    lotsize: 250,
  },

  {
    id: 2,
    symbol: "HDFC Life",
    price: 586.0,
    lotsize: 600,
  },
];

const getLotPrice = (lotSize, price) => lotSize * price;

const getValuation = (lotPrice) => {
  if (lotPrice < 500000) return "LOW";
  if (lotPrice < 700000) return "MID";
  else return "HIGH";
};

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <div>
      <h1>Stock List</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <SearchTitle searchTerm={searchTerm} />
      <hr />
      <ListView stockList={stockList} searchTerm={searchTerm} />
    </div>
  );
};

const SearchTitle = (props) => {
  const strLen = props.searchTerm.trim().length
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

const SearchBar = (props) => {
  const handleSearch = (event) => {
    console.log(event);
    props.setSearchTerm(event.target.value);
  };
  return (
    <div>
      <label htmlFor="searchStock">Search:</label>
      <input id="searchStock " type="text" onChange={handleSearch}></input>
      <button type="submit">Search</button>
    </div>
  );
};

const ListView = (props) => {
  const filteredStockList = props.stockList.filter(stock => stock.symbol.toLowerCase().includes(props.searchTerm.toLowerCase()));
  return (
    <div>
      {filteredStockList.map(function (stock) {
        return (
          <div key={stock.symbol}>
            <span>
              {stock.symbol} : {stock.price}
            </span>
            <br />
            <span>lotsize : {stock.lotsize}</span>
            <br />
            <span>LotPrice: {getLotPrice(stock.lotsize, stock.price)}</span>
            <br />
            <span>
              Valuation: {getValuation(getLotPrice(stock.lotsize, stock.price))}
            </span>
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default App;
