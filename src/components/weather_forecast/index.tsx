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

const dayOfTheWeek = moment().format("dddd");

// const weekDayMap = {
//   0:
// }

const WeatherForecast: React.FunctionComponent<WeatherForecastProps> = ({
  daily,
}) => {
  // show loading spinner if waiting for data
  if (!daily) {
    return (
      <div
        style={{
          backgroundColor: "mediumaquamarine",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  console.log(dayOfTheWeek);
  return (
    <div
      style={{
        backgroundColor: "mediumaquamarine",
        height: "200px",
      }}
    >
      <SubHeading>WEATHER FORECAST</SubHeading>
      <Container>
        <Row>
          {daily.map((day, idx) => {
            return (
              <Col key={idx}>
                <Row>
                  <Col>
                    <p>{dayOfTheWeek}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={`${day.weather[0].main}-icon`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>Min: {Math.round(day.temp.min)}</Col>
                </Row>
                <Row>
                  <Col>Max: {Math.round(day.temp.max)}</Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default WeatherForecast;
