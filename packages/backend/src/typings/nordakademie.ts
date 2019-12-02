export type Event = {
  type: string;
  params: string[];
  dtstamp: Date;
  transparency: string;
  sequence: string;
  uid: string;
  summary: string;
  location: string;
  description: string;
  start: Date;
  datetype: string;
  end: Date;
  priority: string;
  class: string;
};

export type Centuria = {
  name: string;
  semester: number;
};

export type TimeEntry = {
  centuria: string;
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
};
