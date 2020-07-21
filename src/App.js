import React, { useState, useEffect } from "react";
import {
  MenuItem,
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

//import css for leafLetMap
import "leaflet/dist/leaflet.css";

//API URL
const apiUrl = "https://disease.sh/v3/covid-19/";

function App() {
  //hooks
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [isBoxLoaded, setIsBoxLoaded] = useState(false);
  const [casesType, setCasesType] = useState("cases");
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });

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
          //set all the info into mapCountries
          setMapCountries(data);
          //set just name && code of countries
          setCountries(countries);
          //sorted data before send it to state
          const sortedData = sortData(data);
          setTableData(sortedData);
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
        //set the new { center,zoom } to map
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        console.log(data.countryInfo.lat, data.countryInfo.long);
      });
  };

  //onchangeCasesType
  const onchangeCasesType = (e) => {
    const casesType = e.target.value;
    setCasesType(casesType);
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
              variant="filled"
              className="app__dropdown"
              value={casesType}
              onChange={onchangeCasesType}
            >
              <MenuItem value="cases">Cases</MenuItem>
              <MenuItem value="recovered">Recovered</MenuItem>
              <MenuItem value="deaths">Deaths</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <Select
              variant="filled"
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
            isRed
            active={casesType === "cases"}
            type="cases"
            isBoxLoaded={isBoxLoaded}
            title="Cases"
            color="red"
            newCases={countryInfo.todayCases}
            total={countryInfo.cases}
            onClick={(e) => setCasesType("cases")}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"}
            type="recovered"
            isBoxLoaded={isBoxLoaded}
            title="Recovered"
            color="green"
            newCases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            onClick={(e) => setCasesType("recovered")}
          />

          <InfoBox
            active={casesType === "deaths"}
            type="daeths"
            isBoxLoaded={isBoxLoaded}
            title="Deaths"
            newCases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            onClick={(e) => setCasesType("deaths")}
          />
        </div>

        {/* map section */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* table + chart */}
      <Card className="app__right">
        <CardContent>
          {/* table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* graph */}
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
