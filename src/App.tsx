import React from "react";
import Map from "./Components/Map";
import Alerts from "./Components/Alerts";
import Events from "./Components/Events";
import WeatherForecast from "./Components/WeatherForecast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SunshineOMeter from "./Components/SunshineOMeter";
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
