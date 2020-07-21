import React from "react";
import "../css/Footer.css";

const githubUrl = "https://github.com/mohamedelhassak";
function Footer() {
  return (
    <div className="footer">
      <h4>Created By @ELHASSAK MOHAMED</h4>
      <p className="footer__media">
        <a href={githubUrl} target="_blank">
          GITHUB
        </a>
      </p>
    </div>
  );
}

export default Footer;
