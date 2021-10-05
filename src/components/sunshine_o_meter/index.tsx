import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { SubHeading } from "../../app";
import moment from "moment-timezone";
import { currentWeatherItem } from "../../types/weather_api";
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

  const dayLength = sunset.diff(sunrise);
  const daylightLeft = sunset.from(currentTimeET);
  const daylightPercentage = isDaytime
    ? Math.round(100 - (sunset.diff(currentTimeET) / dayLength) * 100)
    : 100;

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        height: "200px",
      }}
    >
      <Row>
        <Col style={{ display: "flex" }}>
          <FaSun style={{ color: "Gold", margin: "5px" }} />
          <SubHeading>
            DAYLIGHT STATUS:
            <span style={{ color: "GoldenRod" }}>
              {isDaytime
                ? ` The sun sets ${daylightLeft}`
                : ` The sun set ${daylightLeft}`}
            </span>
          </SubHeading>
        </Col>
      </Row>
      <Row>
        <Col>Sunrise</Col>
        <Col className="d-flex">
          <div className="ml-auto">Sunset</div>
        </Col>
      </Row>
      <Row>
        <Col>{sunrise.format("LT")}</Col>
        <Col className="d-flex">
          <div className="ml-auto">{sunset.format("LT")}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar
            variant={isDaytime ? "warning" : "dark"}
            now={daylightPercentage}
            animated
            striped
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SunshineOMeter;
