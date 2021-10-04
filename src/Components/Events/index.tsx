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

const key = process.env.REACT_APP_NATIONAL_PARK_EVENTS_API_KEY;
const eventsUrl = `https://developer.nps.gov/api/v1/events?parkCode=acad&api_key=${key}`;

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
          eventsUrl
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

  return (
    <div
      style={{
        backgroundColor: "mediumorchid",
        height: "400px",
      }}
    >
      <SubHeading>Events</SubHeading>
      <Container>
        <Row>
          <Col>
            <div className="d-flex">
              <label>Start</label>
              <DatePicker
                name="start-date"
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
              />
            </div>
          </Col>
          <Col>
            <div className="d-flex">
              <label>End</label>
              <DatePicker
                name="end-date"
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {eventsData?.data?.map((event, idx) => (
                <li key={idx}>{`${event.title}, Dates: ${event.dates} cost: ${
                  event.feeinfo
                    ? event.feeinfo
                    : event.isfree
                    ? "free"
                    : "unknown"
                }`}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Events;
