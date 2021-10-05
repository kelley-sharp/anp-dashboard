import React from "react";
import { SubHeading } from "../../app";
import { NationalParkAlertsApiResponse } from "../../types/national_park_alerts_api";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { FaExclamationTriangle } from "react-icons/fa";

const key = process.env.REACT_APP_NATIONAL_PARK_EVENTS_API_KEY;
const alertsApiUrl = `https://developer.nps.gov/api/v1/alerts?parkCode=acad&api_key=${key}`;

const Alerts: React.FunctionComponent<NationalParkAlertsApiResponse> = (
  NationalParkAlertsApiResponse
) => {
  const [alertsData, setAlertsData] =
    useState<NationalParkAlertsApiResponse | null>(null);

  useEffect(() => {
    try {
      const fetchAlertsData = async () => {
        const response = await axios.get(alertsApiUrl);
        setAlertsData(response.data);
      };
      fetchAlertsData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!alertsData) {
    return (
      <Container style={{ backgroundColor: "darkred", height: "200px" }}>
        <SubHeading>ALERTS</SubHeading>
        <Spinner animation="border" />
      </Container>
    );
  }

  console.log(alertsData);

  return (
    <Container style={{ backgroundColor: "white", height: "200px" }}>
      <SubHeading>ALERTS</SubHeading>
      <ul>
        {alertsData?.data?.map((alert) => (
          <li style={{ listStyle: "none" }} key={alert.id}>
            <FaExclamationTriangle style={{ color: "red", margin: "5px" }} />
            <a style={{ color: "maroon" }} href={alert.url}>
              {alert.title}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Alerts;
