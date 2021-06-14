import { Day } from "./Global";

export type TConfession = {
  id: string;
  title: string;
  date?: string;
  days?: Day[];
  fromTime?: string;
  toTime?: string;
  priest: string;
  period?: string;
};

export type TCreateConfession = Omit<TConfession, "id">;
