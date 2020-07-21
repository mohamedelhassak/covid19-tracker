import React from "react";
import { Map as LeafLetMap, TileLayer } from "react-leaflet";
import "../css/Map.css";
import { showCircleOnMap } from "../helpers/util";
//urls
const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
function Map({ casesType, countries, center, zoom }) {
  return (
    <div className="map">
      <LeafLetMap center={center} zoom={zoom}>
        <TileLayer
          url={mapUrl}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* loop through countries && draw coicles */}
        {showCircleOnMap(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default Map;
