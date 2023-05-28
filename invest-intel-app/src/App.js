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
const stockList1 = [
  {
    id: 1,
    symbol: "HDFC",
    price: 2200,
    lotsize: 200,
  },

  {
    id: 2,
    symbol: "UPL",
    price: 656,
    lotsize: 900,
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
      <hr/>
      <ListView stockList = {stockList}/>
      <ListView stockList = {stockList1}/>
    </div>
  );

}

function ListView(props) {
  return (
    <div>
      {props.stockList.map(function (stock) {
        return (
          <div key={stock.symbol}>
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
