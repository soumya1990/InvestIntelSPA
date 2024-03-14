import React from "react";

import "./App.css";
import { SYMBOL } from "./Constants";
import StockCard from "./StockCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FixedWidthAppBar from "./AppBar";
import Container from "@mui/material/Container";

const url =
  "https://investinteldatatrigger.azurewebsites.net/api/InvestIntelDataTrigger";
const options = {
  method: "GET",
};

// const sections = [
//   { title: "Stock", url: "stocks" },
//   { title: "Health", url: "health" },
//   { title: "Task", url: "task" },
// ];

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

const mytheme = createTheme();

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
    <ThemeProvider theme={mytheme}>
      <Container maxWidth="lg">
        <FixedWidthAppBar
          title="Invest-Intel"
          searchHint="Search Stock"
          onSearch={handleSearch}
          value={searchTerm}
        />
      </Container>
      <div>
        <ListView list={filteredStocks} />
      </div>
    </ThemeProvider>
  );
};

const ListView = ({ list }) =>
  list.map((item, index) => (
    <div>
      <StockCard key={index} {...item} />
    </div>
  ));

export default Stock;
