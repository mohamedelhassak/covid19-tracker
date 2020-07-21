import React from "react";
import "../css/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import { prettyPrintStat } from "../helpers/util";
function InfoBox({
  isRed,
  isGreen,
  active,
  title,
  newCases,
  total,
  isBoxLoaded,
  type,
  ...props
}) {
  //rendring colors for newCases
  const style =
    type === "cases" ? "redc" : type === "recovered" ? "greenc" : null;

  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${
        (active && isRed && "infoBox--selected--red") ||
        (active && isGreen && "infoBox--selected--green") ||
        (active && "infoBox--selected")
      } 
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {isBoxLoaded ? (
          "loading..."
        ) : (
          <div>
            <h2 className={`"infoBox__newCases" ${style}`}>
              {prettyPrintStat(newCases)}
            </h2>
            <Typography className="infoBox__total" color="textSecondary">
              {prettyPrintStat(total)} Total
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
