import React from "react";

type WeatherForecastProps = {
  exampleProp: number;
};

const WeatherForecast: React.FunctionComponent<WeatherForecastProps> = ({
  exampleProp,
}) => {
  return (
    <div
      style={{
        backgroundColor: "mediumaquamarine",
        height: "200px",
      }}
    >
      WEATHER FORECAST
    </div>
  );
};

export default WeatherForecast;
