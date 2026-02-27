import React from "react";

import {
  Sun,
  Droplets,
  Wind,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  CloudFog,
  Tornado,
  CloudSun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WeatherCurrentCard = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (weatherMain) => {
    const condition = weatherMain?.toLowerCase();

    switch (condition) {
      case "clear":
        return <Sun size={140} />;

      case "clouds":
        return <Cloud size={140} />;

      case "rain":
        return <CloudRain size={140} />;

      case "drizzle":
        return <CloudDrizzle size={140} />;

      case "thunderstorm":
        return <CloudLightning size={140} />;

      case "snow":
        return <Snowflake size={140} />;

      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
        return <CloudFog size={140} />;

      case "squall":
        return <Wind size={140} />;

      case "tornado":
        return <Tornado size={140} />;

      default:
        return <CloudSun size={140} />;
    }
  };


  return (
    <Card
      className="relative overflow-hidden border-0 shadow-sm p-6 bg-linear-to-br from-sky-50 via-white to-blue-50
    border-blue-100/50 dark:bg-linear-to-br dark:from-chart-1/50 dark:via-chart-1/30 dark:to-chart-1/80"
    >
      <div className="absolute -right-5 -top-5 opacity-30">
        {getWeatherIcon(weather.condition)}
      </div>

      <CardContent className="relative z-10 flex min-h-55 flex-col justify-between p-6">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-80">
            Current Weather
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold tracking-tighter">
              {Math.round(weather.temperature)}°
            </span>
            <span className="text-xl font-medium">{weather.condition}</span>
          </div>
          <p className="mt-1 text-sm opacity-90">
            Feels like {Math.round(weather.feelsLike)}°
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Droplets className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs opacity-80">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-md">
            <Wind className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs opacity-80">Wind</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCurrentCard;
