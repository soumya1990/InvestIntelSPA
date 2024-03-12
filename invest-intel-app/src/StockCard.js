import React from "react";
import "./App.css";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UpIcon from "./icons/uptrend.svg";
import DownIcon from "./icons/downtrend.svg";
import Utils from "./Utils";
import { PRICE, YEAR_HIGH, YEAR_LOW, LOTSIZE, CHANGE_PERCENT_30 } from "./Constants";

import PercentageLine from "./PercentageLine";
const theme = createTheme();

function StockCard(stock) {
  const positive_daily = stock.CHNG > 0 ? true : false;
  const positive_monthly = stock[CHANGE_PERCENT_30] > 0 ? true : false;
  const low = Utils.numberWithOutComma(stock[YEAR_LOW]);
  const high = Utils.numberWithOutComma(stock[YEAR_HIGH]);
  const price = Utils.numberWithOutComma(stock[PRICE]);
  const lotsize = stock[LOTSIZE];
  const lotprice = lotsize * price;
  const price_pos = Math.round(((price - low) / (high - low)) * 100);
  const color_subheader = positive_daily > 0 ? "green" : "red";
  const currency = "₹";
  var valuation;

  if (lotprice < 600000) {
    valuation = "LOW";
  } else if (lotprice > 800000) {
    valuation = "HIGH";
  } else {
    valuation = "MEDIUM";
  }

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader
          title={stock.SYMBOL}
          subheader={
            <span>
              {currency}
              {stock.LTP}
              <Typography variant="body2" color={color_subheader}>
                {stock.CHNG} ({stock["%CHNG"]}%)
              </Typography>
            </span>
          }
          avatar={
            <Avatar>
              <img src={stock.CHNG > 0 ? UpIcon : DownIcon} alt="Trend Icon" />
            </Avatar>
          }
        ></CardHeader>
        <CardContent>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
          >
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column">
                <Typography variant="body2" gutterBottom>
                  low: {currency}
                  {stock.LOW}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  high: {currency}
                  {stock.HIGH}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column">
                <Typography variant="body2" gutterBottom>
                  prev: {currency}
                  {stock["PREV.CLOSE"]}
                </Typography>

                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ color: positive_monthly ? "green" : "red" }}
                >
                  1 month change %: {stock["30D%CHNG"]}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column">
                <Typography variant="body2" gutterBottom>
                  lot price: {currency}
                  {lotprice}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  lot size: {lotsize}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Valuation: {valuation}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} sm container gridRow={12} alignContent="center">
              <Grid item xs container direction="column" spacing={2}>
                <Typography variant="body2" gutterBottom>
                  52W low: {stock["52WL"]}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  52W high: {stock["52WH"]}
                </Typography>
                <PercentageLine percentage={price_pos}></PercentageLine>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default StockCard;
