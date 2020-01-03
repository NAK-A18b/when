import { SDName, Schedule } from "./hvv";

export type UserInput = {
  centuria?: Centuria;
  tel?: string;
  token?: number;
};

export type User = {
  id: string;
  tel: string;
  centuria?: Centuria;
  connections?: Connection[];
  token?: number;
};

export type Centuria = {
  name: string;
  semester: number;
};

export type Connection = {
  id: string;
  start: SDName;
  end: SDName;
};

export type Delay = {
  id: string;
  schedules: Schedule[];
  realtimeSchedules: Schedule[];
  realtimeAffected: SDName;
  individualTrack: SDName;
};

export type StationInfo = {
  name: string;
  time: string;
};
