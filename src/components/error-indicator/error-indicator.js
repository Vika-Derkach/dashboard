import React from "react";
import icon from "./bam.jpg";
import "./error-indicator.css";
const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <div className="bam">
        <h3>BAM!!!</h3>
      </div>
      <div>Something has gone wrong but keep calm. </div>
      <div> Everything is okay with models and clothes.</div>
      <div>We will fix it soon =)</div>
      <img className="image-bam" src={icon} alt=" error icon" />
    </div>
  );
};
export default ErrorIndicator;
