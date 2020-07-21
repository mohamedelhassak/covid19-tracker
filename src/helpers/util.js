import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

// sorted  array
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//transform data to data chat
export const buildChartDataCases = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

///draw circles on map

const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    rgb: "rgb(204,16,52)",
    half_op: "rgba(204,16,52,0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125,215,29)",
    half_op: "rgba(125,215,29,.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#000",
    rgb: "rgb(251,68,67)",
    half_op: "rgba(251,68,67,.5)",
    multiplier: 2000,
  },
};

export const showCircleOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info__conatainner">
          <div
            className="info__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <h2>{` ${country.country}  `}</h2>
          <h2 className="info__cases">
            {casesType}:
            <span className="info__casesnum">{` ${country[casesType]}  `}</span>
          </h2>
        </div>
      </Popup>
    </Circle>
  ));

// formatting number

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "";
