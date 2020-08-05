import { SDName } from "./hvv";

export type User = {
  id: string;
  tel: string;
  centuria: string;
  connections: string[];
  authCode?: number;
};

export type Connection = {
  id: string;
  start: SDName;
  end: SDName;
};
