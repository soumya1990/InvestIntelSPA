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
  const handleSearch = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
  };
  const filteredStockList = stockList.filter(stock => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Stock List</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      <SearchTitle searchTerm={searchTerm} />
      <hr />
      <ListView list={filteredStockList} />
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

const SearchBar = ({searchTerm, onSearch}) => {
  return (
    <div>
      <label htmlFor="searchStock">Search:</label>
      <input id="search"
       type="text"
       value={searchTerm}
       onChange={onSearch}>

       </input>
      <button type="submit">Search</button>
    </div>
  );
};

const Item = ({ symbol, lotsize, price }) => (
  <div>
    <span>
      {symbol} : {price}
    </span>
    <br/>
    <span>lotsize : {lotsize}</span>
    <br/>
    <span>LotPrice: {getLotPrice(lotsize, price)}</span>
    <br/>
    <span>
      Valuation: {getValuation(getLotPrice(lotsize, price))}
    </span>
    <br/>
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
