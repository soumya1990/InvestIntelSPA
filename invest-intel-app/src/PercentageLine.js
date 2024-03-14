import React from "react";
import { LinearProgress, Typography } from "@mui/material";

function PercentageLine({ percentage }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2" gutterBottom>
        52WL
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        style={{ width: "80%" }}
      />
      <Typography variant="body2" gutterBottom>
        52WH
      </Typography>
    </div>
  );
}
export default PercentageLine;
