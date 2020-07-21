import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Menu,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

import InfoBox from "./componenets/InfoBox";
import Map from "./componenets/Map";
import Table from "./componenets/Table";
import { sortData } from "./helpers/util";
import LineGraph from "./componenets/LineGraph";

//API URL
const apiUrl = "https://disease.sh/v3/covid-19/";

function App() {
  //hooks
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isBoxLoaded, setIsBoxLoaded] = useState(false);

  //useEffect call API
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`${apiUrl}countries`)
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //name
            code: country.countryInfo.iso2,
          }));

          //sorted data before send it to state
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
        .catch((err) => console.log(err));
    };

    getCountriesData(); //call function
  }, []);

  //useeffect for country fetch
  useEffect(() => {
    //set loaded state to true before fetchin data
    setIsBoxLoaded(true);
    fetch(`${apiUrl}all`)
      .then((res) => res.json())
      .then((data) => {
        //store all the data of country
        setCountryInfo(data);
        console.log(data);
        setIsBoxLoaded(false);
      });
  }, []);

  //onchangeCountry
  const onchangeCountry = async (e) => {
    //set current countery
    const countryCode = e.target.value;
    setCurrentCountry(countryCode);
    //call API for specific country
    const url =
      countryCode === "worldwide"
        ? `${apiUrl}all`
        : `${apiUrl}countries/${countryCode}`;

    setIsBoxLoaded(true);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //store all the data of country
        setCountryInfo(data);
        setIsBoxLoaded(false);
      });
  };

  return (
    <div className="app">
      {/* hreader + infoboxs + map */}
      <div className="app__left">
        {/* Header Section */}
        <div className="app__header">
          <h2>Covid19 Tracker</h2>
          <FormControl>
            <Select
              variant="standard"
              className="app__dropdown"
              value={currentCountry}
              onChange={onchangeCountry}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxs section */}
        <div className="app__infobox">
          <InfoBox
            isBoxLoaded={isBoxLoaded}
            title="Cases"
            color="red"
            newCases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            isBoxLoaded={isBoxLoaded}
            title="Recovered"
            color="green"
            newCases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox
            isBoxLoaded={isBoxLoaded}
            title="Deaths"
            newCases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* map section */}
        <Map />
      </div>

      {/* table + chart */}
      <Card className="app__right">
        <CardContent>
          {/* table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
