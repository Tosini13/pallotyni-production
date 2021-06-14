import { Day } from "./Global";

export type TService = {
  id: string;
  title: string;
  time: string;
  days?: Day[];
  date?: string;
  period?: string;
  priest: string;
};

export type TServiceCreate = Omit<TService, "id">;
