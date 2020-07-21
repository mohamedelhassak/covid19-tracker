import React from "react";
import "../css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, newCases, total, isBoxLoaded }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {isBoxLoaded ? (
          "loading..."
        ) : (
          <div>
            <h2 className="infoBox__newcases">{`+ ${newCases}`}</h2>
            <Typography className="infoBox__total" color="textSecondary">
              {total} Total
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
