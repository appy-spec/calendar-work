import React,{useEffect, useState} from "react";
import Weather from "./Weather";
import Addmood from "./Addmood";
import axios from "axios";

function Homepage() {

  let[getWeather, setWeather]=useState({
  
      temperature:"",
      windspeed: "",
      humidity: "",
      place:""
  
    });
  
    useEffect(() => {
  
      // used to get user current location to get weather details
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
  
      // used reverse geocoding to get a city from the co-ordonates
  
      const city = async (latitude, longitude) => {
        try {
          const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
            },
          });
      
          const city = response.data.address.city || response.data.address.town || response.data.address.village;
          return city;
  
        } catch (error) {
          console.error("Error getting city:", error.message);
        }
  
      };
  
  
      // used to get the current location weather
  
      const getWeather = async (latitude, longitude) => {
  
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            {
              params: {
                latitude: latitude,
                longitude: longitude,
                current_weather: true,
                hourly: "relative_humidity_2m",
              },
            }
          );
  
          const currentHour = new Date().getHours();
          const humidityData = response.data.hourly.relative_humidity_2m;
          const humidityNow = humidityData[currentHour];
          const weather = response.data.current_weather;
  
          let weatherData={
  
            temperature: weather.temperature,
            windspeed: weather.windspeed,
            humidity: humidityNow,
            place:city(latitude, longitude),
  
          };
          setWeather({...weatherData});
  
        } catch (error) {
  
          console.error("Weather API error:", error.message);
        }

      };

    }, []);
  
  return (

    <>
    <div className="homepage">
      <div className="addcomponent">
        <Addmood getWeather={getWeather}></Addmood>
      </div>
      <div className="weathercomponent">
        { getWeather?.place!=="" && (<Weather getWeather={getWeather}></Weather>)}
      </div>
    </div>   
    </>
  );
}

export default Homepage;
