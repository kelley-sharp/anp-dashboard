import React from "react";
import { useEffect, useState } from "react";
import { NationalParkEventsApiResponse } from "../../types/national_park_events_api";
import axios from "axios";
import { SubHeading } from "../../app";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaSeedling } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import moment from "moment";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import FormGroup from "react-bootstrap/FormGroup";
import debounce from "lodash/debounce";

const DateLabel = styled.label`
  height: 30px;
`;

const key = process.env.REACT_APP_NATIONAL_PARK_EVENTS_API_KEY;
const eventsUrl = `https://developer.nps.gov/api/v1/events?parkCode=acad`;

const fetchEventsDataWithFilters = async ({
  startDate,
  endDate,
  search,
}: {
  startDate: Date | null;
  endDate: Date | null;
  search: string | undefined;
}): Promise<NationalParkEventsApiResponse> => {
  let url = `${eventsUrl}&api_key=${key}`;
  if (startDate) {
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    url += `&dateStart=${formattedStartDate}`;
  }
  if (endDate) {
    const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
    url += `&dateEnd=${formattedEndDate}`;
  }
  if (search) {
    url += `&q=${search}`;
  }
  const response = await axios.get<NationalParkEventsApiResponse>(url);
  return response.data;
};

const Events: React.FunctionComponent<NationalParkEventsApiResponse> = (
  NationalParkEventsApiResponse
) => {
  const [eventsData, setEventsData] =
    useState<NationalParkEventsApiResponse | null>(null);
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
  const handleResetFilters = async () => {
    setStartDate(null);
    setEndDate(null);
    setSearch("");
    try {
      const response = await axios.get<NationalParkEventsApiResponse>(
        `${eventsUrl}&api_key=${key}`
      );
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleStartDateFilter = async (newStartDate: Date) => {
    setStartDate(newStartDate);
  };

  const handleEndDateFilter = async (newEndDate: Date) => {
    setEndDate(newEndDate);
  };

  const [search, setSearch] = useState<string>("");
  const handleSearch = async (newSearchVal: string) => {
    setSearch(newSearchVal);
  };

  useEffect(() => {
    const fetchAfterFiltersChange = debounce(async () => {
      try {
        const newEventsData = await fetchEventsDataWithFilters({
          endDate,
          startDate,
          search,
        });
        if (newEventsData) {
          setEventsData(newEventsData);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);

    fetchAfterFiltersChange();

    return () => {
      fetchAfterFiltersChange.cancel();
    };
  }, [endDate, search, startDate]);

  if (!eventsData) {
    return (
      <div>
        <SubHeading>EVENTS</SubHeading>
        <Spinner animation="border" />
      </div>
    );
  }

  const areFiltersApplied = Boolean(search || startDate || endDate);

  return (
    <div className="mt-5 mt-lg-0">
      <div className="d-flex">
        <FaSeedling style={{ color: "darkgreen" }} className="mt-1 mr-1" />
        <SubHeading>EVENTS</SubHeading>
      </div>
      <Card className="p-0">
        <Card.Header className="bg-light">
          <Row>
            <Col>
              <DateLabel className="mb-0 pr-1">Start Date</DateLabel>
              <DatePicker
                name="start-date"
                selected={startDate}
                onChange={(date) => handleStartDateFilter(date as Date)}
                className="border-dark border rounded"
                placeholderText="Select a date"
              />
            </Col>
            <Col>
              <DateLabel className="mb-0 pr-1">End Date</DateLabel>
              <DatePicker
                name="end-date"
                selected={endDate}
                onChange={(date) => handleEndDateFilter(date as Date)}
                className="border-dark border rounded"
                placeholderText="Select a date"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="mt-3">
                <FormLabel>Search</FormLabel>
                <FormControl
                  type="text"
                  className="border border-dark"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Type to filter by search keywords"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex">
              <Button
                className="ml-auto my-0 border-0"
                style={{ backgroundColor: "green", cursor: "not-allowed" }}
                size="sm"
                onClick={handleResetFilters}
                disabled={!areFiltersApplied}
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
              {!eventsData.data || eventsData.data.length === 0 ? (
                <tr>
                  <td colSpan={3}>No events found.</td>
                </tr>
              ) : (
                eventsData.data.map((event, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <a
                          href={event.infourl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {event.title}{" "}
                        </a>
                      </td>
                      <td>
                        <ul className="pl-0" style={{ listStyle: "none" }}>
                          {event?.dates?.map((date) => (
                            <li key={date}>
                              {moment(date).format("MM/DD/YY")}
                            </li>
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
                })
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Events;
