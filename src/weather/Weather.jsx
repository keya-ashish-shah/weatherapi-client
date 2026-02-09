import React, { useState } from "react";
import { fetchWeather } from "./weatherService";
import { useAuth } from "../auth/AuthContext";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Weather = () => {
  const { user, token } = useAuth();
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchCity.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather({ city: searchCity.trim(), user, token });
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code) => {
    if (!code) return <WiCloud size={50} />;
    if (code.includes("rain")) return <WiRain size={50} />;
    if (code.includes("snow")) return <WiSnow size={50} />;
    if (code.includes("clear")) return <WiDaySunny size={50} />;
    return <WiCloud size={50} />;
  };

  const hourlyTrend = weatherData?.hourly?.time?.map((time, i) => ({
    time: new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: weatherData.hourly.temperature_2m[i],
    humidity: weatherData.hourly.relativehumidity_2m[i],
  }));

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        🌦️ Weather Search 
      </h2>

      <div className="flex mb-4 justify-center">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-grow border p-2 rounded-l-md outline-none max-w-sm"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md"
        >
          Search 
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {weatherData && weatherData.current_weather && (
        <div className="bg-white rounded-lg p-4 shadow text-center mt-4 animate-fadeIn">
          <h3 className="text-xl font-bold mb-2">{searchCity}</h3>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weatherData.current_weather.weathercode?.toString() || "")}
            <p className="text-2xl mt-2"> 
              {weatherData.current_weather.temperature}°C
            </p>
            <p className="text-gray-600">
              Wind: {weatherData.current_weather.windspeed} km/h
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Source: {weatherData.source === "cache" ? "Cached" : "Live from Open-Meteo"}
          </p>

          {hourlyTrend && hourlyTrend.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2"> 
                24-hour Temperature & Humidity Trend
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" interval={15} tick={{ fontSize: 8 }} />
                  <YAxis
                    yAxisId="left"
                    label={{ value: "°C", angle: -90, position: "insideLeft" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right" 
                    label={{ value: "%", angle: -90, position: "insideRight" }}
                  />
                  <Tooltip /> 
                  <Line 
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f87171"
                    name="Temperature (°C)"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="humidity"
                    stroke="#60a5fa"
                    name="Humidity (%)"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;


