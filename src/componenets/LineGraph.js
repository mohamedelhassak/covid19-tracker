import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { buildChartDataCases } from "../helpers/util";
import numeral from "numeral";

const apiUrl = "https://disease.sh/v3/covid-19/";
const lastdays = 120;

//options for chart
const options = {
  legend: { display: false },
  elements: {
    point: { radius: 0 },
  },

  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    collbackks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },

  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: { display: false },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType }) {
  //hooks
  const [data, setData = -[]] = useState({});

  //useEffect fetch data from api
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}historical/all?lastdays=${lastdays}`)
        .then((res) => res.json())
        .then((data) => {
          //
          const chartData = buildChartDataCases(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
                borderColor: "#cc1034",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
