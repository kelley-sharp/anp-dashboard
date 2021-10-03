import React from "react";
import Map from "./components/map";
import Alerts from "./components/alerts";
import Events from "./components/events";
import WeatherForecast from "./components/weather_forecast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SunshineOMeter from "./components/sunshine_o_meter";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherApiOneCallResponse } from "./types/weather_api";

const Header = styled.h1`
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const weatherBaseURL = "https://api.openweathermap.org/data/2.5/onecall?";
const coordinates = [44.385833, -68.209444];
const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] =
    useState<WeatherApiOneCallResponse | null>(null);

  useEffect(() => {
    try {
      const fetchWeatherData = async () => {
        const response = await axios.get<WeatherApiOneCallResponse>(
          `${weatherBaseURL}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${key}`
        );
        setWeatherData(response.data);
        console.log(response.data);
      };
      fetchWeatherData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Header>Acadia National Park Dashboard</Header>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Alerts />
            </Col>
          </Row>
          <Row>
            <Col>
              <Events />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Map />
            </Col>
          </Row>
          <Row>
            <Col>
              <WeatherForecast exampleProp={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SunshineOMeter />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
