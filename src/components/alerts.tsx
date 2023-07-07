import React from "react";
import { SubHeading } from "./app";
import { NationalParkAlertsApiResponse } from "../types/national_park_alerts_api";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { FaExclamationTriangle } from "react-icons/fa";
require("dotenv").config();

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
      <div>
        <SubHeading>ALERTS</SubHeading>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex">
        <FaExclamationTriangle className="text-danger mr-1 mt-1" />
        <SubHeading>ALERTS</SubHeading>
      </div>

      <ol style={{ color: "maroon" }}>
        {alertsData?.data?.map((alert) => (
          <li key={alert.id}>
            <a
              href={alert.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "maroon" }}
            >
              {alert.title}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Alerts;
