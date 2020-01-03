import { SDName } from "./hvv";

export type User = {
  id: string;
  tel: string;
  centuria: string;
  connections: string[];
  token?: number;
};

export type Connection = {
  id: string;
  start: SDName;
  end: SDName;
};
