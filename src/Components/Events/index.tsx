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
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaSeedling } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import moment from "moment";

const DateLabel = styled.label`
  height: 30px;
`;

const key = process.env.REACT_APP_NATIONAL_PARK_EVENTS_API_KEY;
const eventsUrl = `https://developer.nps.gov/api/v1/events?parkCode=acad`;

const fetchEventsDataForDates = async (
  startDate: Date | null,
  endDate: Date | null
): Promise<NationalParkEventsApiResponse> => {
  const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

  console.log("FETCHING");
  console.log(
    `${eventsUrl}&dateStart=${formattedStartDate}&dateEnd=${formattedEndDate}&api_key=${key}`
  );
  const response = await axios.get<NationalParkEventsApiResponse>(
    `${eventsUrl}&dateStart=${formattedStartDate}&dateEnd=${formattedEndDate}&api_key=${key}`
  );
  return response.data;
};

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
      <Container
        style={{
          backgroundColor: "mediumorchid",
          height: "400px",
        }}
      >
        <SubHeading>EVENTS</SubHeading>
        <Spinner animation="border" />
      </Container>
    );
  }

  const handleStartDateFilter = async (newStartDate: Date) => {
    setStartDate(newStartDate);
    try {
      const newEventsData = await fetchEventsDataForDates(
        newStartDate,
        endDate
      );
      setEventsData(newEventsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndDateFilter = async (newEndDate: Date) => {
    setEndDate(newEndDate);
    try {
      const newEventsData = await fetchEventsDataForDates(
        startDate,
        newEndDate
      );
      setEventsData(newEventsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowAllEvents = async () => {
    try {
      const response = await axios.get<NationalParkEventsApiResponse>(
        `${eventsUrl}&api_key=${key}`
      );
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5 mt-lg-0">
      <div className="d-flex">
        <FaSeedling style={{ color: "darkgreen" }} className="mt-1 mr-1" />
        <SubHeading>EVENTS</SubHeading>
      </div>
      <Card className="p-0">
        <Card.Header className="bg-light">
          <Row>
            <Col className="d-flex align-items-end">
              <DateLabel className="mb-0 d-flex align-items-center pr-1">
                Start Date
              </DateLabel>
              <DatePicker
                name="start-date"
                selected={startDate}
                onChange={(date) => handleStartDateFilter(date as Date)}
              />
            </Col>
            <Col className="d-flex align-items-end">
              <DateLabel className="mb-0 d-flex align-items-center pr-1">
                End Date
              </DateLabel>
              <DatePicker
                name="end-date"
                selected={endDate}
                onChange={(date) => handleEndDateFilter(date as Date)}
              />
            </Col>
            <Col className="d-flex align-items-center">
              <Button
                className="ml-auto my-0 border-0"
                style={{ backgroundColor: "darkgreen" }}
                size="sm"
                onClick={handleShowAllEvents}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <Table bordered responsive className="mb-0" size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date(s)</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {eventsData?.data?.map((event, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <a href={event.infourl} target="_blank" rel="noreferrer">
                        {event.title}{" "}
                      </a>
                    </td>
                    <td>
                      <ul className="pl-0" style={{ listStyle: "none" }}>
                        {event?.dates?.map((date) => (
                          <li key={date}>{moment(date).format("MM/DD/YY")}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ maxWidth: "12rem" }}>
                      {event.feeinfo
                        ? event.feeinfo
                        : event.isfree
                        ? "free"
                        : "there may be a fee"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Events;
