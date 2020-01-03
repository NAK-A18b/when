export enum SDType {
  UNKNOWN,
  STATION,
  ADDRESS,
  POI,
  COORDINATE
}

export enum SimpleServiceType {
  BUS,
  TRAIN,
  SHIP,
  FOOTPATH,
  BICYCLE,
  AIRPLANE,
  CHANGE,
  CHANGE_SAME_PLATFORM
}

export type GTITime = {
  time: string;
  date: string;
};

export type Attribute = {
  value: string;
  type: string[];
};

export type Coordinate = {
  x: number;
  y: number;
};

export type SDName = {
  name: string;
  city: string;
  combinedName: string;
  id: string;
  type: SDType;
  coordinate: Coordinate;
  serviceTypes: string[];
  hasStationInformation: boolean;
};

export type JourneySDName = SDName & {
  arrTime: GTITime;
  depTime: GTITime;
  platform: string;
  arrDelay: number;
  depDelay: number;
  extra: boolean;
  cancelled: boolean;
  intermediateStops: JourneySDName[];
  realtimePlatform: string;
};

export type Service = {
  id: string;
  name: string;
  direction: string;
  directionId: number;
  type: SimpleServiceType;
};

export type Path = {
  track: Coordinate[];
};

export type ScheduleElement = {
  from: JourneySDName;
  to: JourneySDName;
  line: Service;
  paths: Path[];
  extra: boolean;
  cancelled: boolean;
  intermediateStops: JourneySDName[];
};

export type BasePayload = {
  version?: string;
};

export type CheckNamePayload = BasePayload & {
  theName: { name: string; type: string };
  maxList: number;
};

export type CheckNameResponse = BaseResponse & {
  results: SDName[];
};

export type GetRoutePayload = BasePayload & {
  language: string;
  start: SDName;
  dest: SDName;
  time: {
    date: string;
    time: string;
  };
  timeIsDeparture: boolean;
  schedulesBefore: number;
  schedulesAfter: number;
  realtime: string;
};

export type Schedule = {
  routeId: number;
  start: SDName;
  dest: SDName;
  time: number;
  footpathTime: number;
  scheduleElements: ScheduleElement[];
};

export type BaseResponse = {
  returnCode: string;
};

export type GetRouteResponse = BaseResponse & {
  schedules: Schedule[];
  realtimeSchedules: Schedule[];
  realtimeAffected: SDName;
  individualTrack: SDName;
};
