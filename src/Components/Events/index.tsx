import React from "react";
import { useEffect, useState } from "react";
import { NationalParkEventsApiResponse } from "../../types/national_park_events_api";
import axios from "axios";
import { SubHeading } from "../../app";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const DateLabel = styled.label`
  padding: 5px;
  background-color: lightgrey;
  height: 29.5px;
  /* top-left | top-right | bottom-right | bottom-left */
  border-radius: 2px 0 0 2px;
  border-color: rgb(118, 118, 118);
  border-style: solid;
  border-width: thin;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const key = process.env.REACT_APP_NATIONAL_PARK_EVENTS_API_KEY;
const eventsUrl = `https://developer.nps.gov/api/v1/events?parkCode=acad`;

const Events: React.FunctionComponent<NationalParkEventsApiResponse> = (
  NationalParkEventsApiResponse
) => {
  const [eventsData, setEventsData] =
    useState<NationalParkEventsApiResponse | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    try {
      const fetchNationalParkEventsData = async () => {
        const response = await axios.get<NationalParkEventsApiResponse>(
          `${eventsUrl}&api_key=${key}`
        );
        setEventsData(response.data);
      };
      fetchNationalParkEventsData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!eventsData) {
    return (
      <div
        style={{
          backgroundColor: "mediumorchid",
          height: "400px",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  const handleStartDateFilter = async (date: Date) => {
    setStartDate(date);
    try {
      const newResponse = await axios.get(
        `${eventsUrl}&dateStart=${startDate}&dateEnd=${endDate}&api_key=${key}`
      );
      setEventsData(newResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndDateFilter = async (date: Date) => {
    setEndDate(date);
    try {
      const formattedStartDate = startDate?.toISOString().split("T")[0];
      const formattedEndDate = endDate?.toISOString().split("T")[0];
      const newResponse = await axios.get(
        `${eventsUrl}&dateStart=${formattedStartDate}&dateEnd=${formattedEndDate}&api_key=${key}`
      );
      setEventsData(newResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "mediumorchid",
        height: "500px",
      }}
    >
      <SubHeading>EVENTS</SubHeading>
      <Container>
        <Row>
          <Col>
            <div className="d-flex">
              <DateLabel>Start</DateLabel>
              <DatePicker
                name="start-date"
                selected={startDate}
                onChange={(date) => handleStartDateFilter(date as Date)}
              />
            </div>
          </Col>
          <Col>
            <div className="d-flex">
              <DateLabel>End</DateLabel>
              <DatePicker
                name="end-date"
                selected={endDate}
                onChange={(date) => handleEndDateFilter(date as Date)}
              />
            </div>
          </Col>
          <Col>
            <div>This is a search bar</div>
          </Col>
          <Col>
            <div>This is a Tag selector</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {eventsData?.data?.map((event, idx) => {
                return (
                  <li key={idx}>{`${event.title}, Dates: ${event.dates} cost: ${
                    event.feeinfo
                      ? event.feeinfo
                      : event.isfree
                      ? "free"
                      : "unknown"
                  }`}</li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Events;
