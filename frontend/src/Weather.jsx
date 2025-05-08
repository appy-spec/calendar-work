import React from "react";

function Weather({ getWeather }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <h3>Weather</h3>
        <p>
          <strong>Temp:</strong> {getWeather.temperature}°C
        </p>
        <p>
          <strong>Humidity:</strong> {getWeather.humidity}%
        </p>
        <p>
          <strong>WindSpeed:</strong> {getWeather.windspeed} km/hr
        </p>
        <p>
          <strong>City:</strong> {getWeather.place}
        </p>
      </div>
    </>
  );
}

export default Weather;
