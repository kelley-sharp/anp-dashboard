import React from "react";
import Map from "./map";
import Alerts from "./alerts";
import Events from "./events";
import WeatherForecast from "./weather_forecast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SunshineOMeter from "./sunshine_o_meter";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherApiOneCallResponse } from "../types/weather_api";

const Header = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const SubHeading = styled.p`
  height: 15px;
  color: darkgreen;
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
          `${weatherBaseURL}lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${key}&units=imperial`
        );
        setWeatherData(response.data);
      };
      fetchWeatherData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container fluid style={{ maxWidth: 1200 }}>
      <Header style={{ color: "darkgreen" }} className="mb-lg-5 mb-3 mt-3">
        Acadia National Park Dashboard
      </Header>
      <Row>
        <Col xs={12} lg={6}>
          <Alerts />
        </Col>
        <Col xs={12} lg={6}>
          <SunshineOMeter currentWeather={weatherData?.current} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <Events />
        </Col>
        <Col xs={12} lg={6}>
          <WeatherForecast daily={weatherData?.daily} />
          <Map />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
