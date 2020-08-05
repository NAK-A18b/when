import { SDName, Schedule } from "./hvv";

export type CreateUserInput = {
  centuria?: Centuria;
  tel: string;
  authCode: number;
};

export type User = {
  id: string;
  tel: string;
  token: string;
  centuria?: Centuria;
  connections?: Connection[];
  authCode?: number;
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
