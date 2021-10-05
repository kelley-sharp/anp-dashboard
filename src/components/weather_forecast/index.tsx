import React from "react";
import { Spinner } from "react-bootstrap";
import { DailyItem } from "../../types/weather_api";
import { SubHeading } from "../../app";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

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
  const sevenDayForecast = daily?.filter((day, idx) => idx <= 6);

  for (let i = 0; i < weekDayMap.length; i++) {
    if (weekDayMap[i] === TodaysWeekDay) {
      weekDayMap[i] = "Today";
    }
  }

  // show loading spinner if waiting for data
  if (!daily) {
    return (
      <Container
        style={{
          backgroundColor: "mediumaquamarine",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubHeading>WEATHER FORECAST</SubHeading>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container
      style={{
        backgroundColor: "mediumaquamarine",
        height: "200px",
      }}
    >
      <SubHeading>WEATHER FORECAST</SubHeading>
      <Container>
        <Row>
          {sevenDayForecast?.map((day, idx) => {
            return (
              <Col key={idx}>
                <Row>
                  <Col style={{ height: "10px" }}>
                    <p>{weekDayMap[idx]}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <img
                      style={{ height: "55px", width: "55px" }}
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={`${day.weather[0].main} icon`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>High: {Math.round(day.temp.max)}</Col>
                </Row>
                <Row>
                  <Col>Low: {Math.round(day.temp.min)}</Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default WeatherForecast;
