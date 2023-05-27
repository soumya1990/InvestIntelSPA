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
];

function getLotPrice (lotSize, price) {
  return lotSize*price
}

function getValuation(lotPrice) {
  if(lotPrice<500000) return 'LOW'
  if(lotPrice<700000) return 'MID'
  else return 'HIGH'
}

function App() {
  return (
    <div>
      <h1>Stock List</h1> 
      <hr />
      {stockList.map(function (stock) {
        return (
          <div key={stock.price}>
            <span>
              {stock.symbol} : {stock.price}
            </span>
            <br />
            <span>lotsize : {stock.lotsize}</span>
            <br />
            <span>
              LotPrice: {getLotPrice(stock.lotsize,  stock.price)}
            </span>
            <br />
            <span>
              Valuation: {getValuation(getLotPrice(stock.lotsize,  stock.price))}
            </span>
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
