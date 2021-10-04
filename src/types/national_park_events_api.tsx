export type ImageItem = {
  description?: string;
  altText?: string;
  caption?: string;
  credit?: string;
  imageId?: string;
  //example: 21803
  ordinal?: string;
  //example: 0
  path?: string;
  //example?: /common/uploads/event_calendar/1B853925-E059-D529-0C87BCF597BE816B.jpg
  title?: string;
  url?: string;
};

export type TimeItem = {
  timestart?: string;
  timeend?: string;
  sunsetend?: boolean;
  sunrisestart?: boolean;
};

export type NationalParkEventsDataItem = {
  datetimeupdated?: string;
  infourl?: string;
  //URL for more information about the event
  sitetype?: string;
  //Site type of the associated site for event
  regresurl?: string;
  //URL for required reservation or registration for event
  recurrencedatestart?: string;
  //Date the event recurrence starts ex?: "2023-11-20"
  parkfullname?: string;
  //Name and designation of the park associated with event
  isallday?: boolean;
  //The event takes place all day
  dates?: string[];
  times?: TimeItem[];
  createuser?: string;
  contactname?: string;
  //Name of event contact
  latitude?: string;
  //The latitude of the event location
  recurrencerule?: string;
  //Recurrence rule for event
  contacttelephoneNumber?: string;
  //Phone number for event contact
  dateend?: string;
  //End date for event ex?: "2017-09-16"
  datetimecreated?: string;
  date?: string;
  //Date of next upcoming event ex?: "2017-09-16"
  longitude?: string;
  //The longitude of the event location
  isrecurring?: boolean;
  //The event has recurrence
  feeinfo?: string;
  //Fee information for event
  imageidlist?: string;
  datestart?: string;
  //Start date for event ex?: "2017-09-16"
  sitecode?: string;
  //Site code of the associated site for event
  eventid?: string;
  //example?: 0
  isregresrequired?: string;
  //The event requires registration or reservation
  location?: string;
  //The location the event takes place
  isfree?: boolean;
  //The event is free
  portalname?: string;
  //Name of the portal site associated with event
  subjectname?: string;
  //Name of associated subject site for event
  contactemailaddress?: string;
  //Email address for event contact
  title?: string;
  //Event title
  images?: ImageItem[];
  tags?: string[];
  types?: string[];
  categoryid?: string;
  //example?: 1
  regresinfo?: string;
  //Additional information on required reservation or registration for event
  timeinfo?: string;
  //Additional information about times for event
  id?: string;
  //Unique identifier for this event. example?: F0092036-921D-2344-8498FB0012847F3C
  description?: string;
  //Event description
  recurrencedateend?: string;
  //Date the event recurrence ends
  category?: string;
  //Category for event
  organizationname?: string;
  //Name of the organization associated with event
};

export type NationalParkEventsApiResponse = {
  total?: number;
  errors?: [];
  data?: NationalParkEventsDataItem[];
  dates?: string;
  // example?: 2020-01-01,2019-12-04,2019-12-11
  pagenumber?: string;
  // example?: 1
  pagesize?: string;
  // example?: 50
};
