import React from "react";
import "../css/Table.css";
import { prettyPrintStat } from "../helpers/util";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td className="table__country">{country}</td>
          <td className="table__value">{prettyPrintStat(cases)}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
