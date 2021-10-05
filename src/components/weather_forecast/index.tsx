import React from "react";
import { Spinner } from "react-bootstrap";
import { DailyItem } from "../../types/weather_api";
import { SubHeading } from "../../app";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import { FaSun } from "react-icons/fa";

type WeatherForecastProps = {
  daily: DailyItem[] | undefined;
};

const TodaysWeekDay = moment().format("dddd");

const WeatherForecast: React.FunctionComponent<WeatherForecastProps> = ({
  daily,
}) => {
  // set weekdays
  let weekDayMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //Trim extra days in forecast from data

  for (let i = 0; i < weekDayMap.length; i++) {
    if (weekDayMap[i] === TodaysWeekDay) {
      weekDayMap[i] = "Today";
    }
  }

  // show loading spinner if waiting for data
  if (!daily) {
    return (
      <div>
        <SubHeading>WEATHER FORECAST</SubHeading>
        <Spinner animation="border" />
      </div>
    );
  }

  const forecast = daily.slice(0, 5);

  return (
    <div className="mt-5 mt-lg-0">
      <div className="d-flex">
        <FaSun style={{ color: "Gold" }} className="mr-1 mt-1" />
        <SubHeading>WEATHER FORECAST</SubHeading>
      </div>
      <Row className="mx-2 mt-3">
        {forecast.map((day, idx) => {
          return (
            <Col
              key={idx}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <p className="mb-1">{weekDayMap[idx]}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={`${day.weather[0].main} icon`}
                height={55}
                width={55}
              />
              <span>High {Math.round(day.temp.max)}</span>
              <span>Low {Math.round(day.temp.min)}</span>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WeatherForecast;
