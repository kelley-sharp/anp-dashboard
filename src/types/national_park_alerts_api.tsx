export type AlertItem = {
  category?: string;
  //Alert type: Danger, Caution, Information, or Park Closure
  description?: string;
  //Alert description
  id: string;
  //Unique identifier for an alert record
  parkCode?: string;
  //A variable width character code that uniquely identifies a specific park
  title: string;
  //Alert title
  url?: string;
  //Link to more information about the alert, if available
};

export type NationalParkAlertsApiResponse = {
  total?: string;
  //example: 474
  data?: AlertItem[];
  limit?: string;
  //example: 50
  start?: string;
  //example: 0
};
