import React from "react";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import { SubHeading } from "./app";
import moment from "moment-timezone";
import { currentWeatherItem } from "../types/weather_api";
import Spinner from "react-bootstrap/Spinner";
import { FaSun } from "react-icons/fa";

type SunshineProps = {
  currentWeather: currentWeatherItem | undefined;
};

const SunshineOMeter: React.FunctionComponent<SunshineProps> = ({
  currentWeather,
}) => {
  if (!currentWeather) {
    return (
      <Container
        style={{
          backgroundColor: "white",
          height: "200px",
        }}
      >
        <SubHeading>DAYLIGHT STATUS</SubHeading>
        <Spinner animation="border" />
      </Container>
    );
  }
  const currentTimeET = moment().tz("America/New_York");
  const sunrise = moment.unix(currentWeather.sunrise).tz("America/New_York");
  const sunset = moment.unix(currentWeather.sunset).tz("America/New_York");

  const isDaytime = currentTimeET.isBetween(sunrise, sunset);
  const isAfterSunset = currentTimeET.isAfter(sunset);

  const dayLength = sunset.diff(sunrise);
  const daylightLeft = sunset.from(currentTimeET);
  const daylightPercentage = isDaytime
    ? Math.round(100 - (sunset.diff(currentTimeET) / dayLength) * 100)
    : 100;

  return (
    <div>
      <div className="d-flex">
        <FaSun style={{ color: "Gold" }} className="mr-1 mt-1" />
        <SubHeading>
          DAYLIGHT STATUS:
          <span style={{ color: "GoldenRod" }}>
            {isDaytime
              ? ` The sun sets ${daylightLeft}`
              : isAfterSunset
              ? ` The sun set ${daylightLeft}`
              : ` The sun rises ${sunrise.fromNow()}`}
          </span>
        </SubHeading>
      </div>
      <div className="px-3 mt-4">
        <ProgressBar
          variant={isDaytime ? "warning" : "dark"}
          now={daylightPercentage}
          animated
          striped
        />
        <div className="d-flex mt-1">
          <h6 className="mb-0">Sunrise {sunrise.format("LT")}</h6>
          <h6 className="mb-0 ml-auto">Sunset {sunset.format("LT")}</h6>
        </div>
      </div>
    </div>
  );
};

export default SunshineOMeter;
