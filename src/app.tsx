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

const Header = styled.h1`
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

function App() {
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
              <WeatherForecast />
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
