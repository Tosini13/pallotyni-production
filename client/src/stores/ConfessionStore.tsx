import React, { createContext } from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { DATE_FORMAT, Day } from "../models/Global";
import axios from "axios";
import { CONFESSIONS_API_URL } from "../models/const";
import { TConfession, TCreateConfession } from "../models/Confession";
import { isSameDay, isAfter, format } from "date-fns";
import { pl } from "date-fns/locale";
const add = require("date-fns/add");
const isBefore = require("date-fns/isBefore");
const isSameMinute = require("date-fns/isSameMinute");

export class Confession {
  // if date is undefined days are defined and otherwise
  id: string;
  title: string;
  date?: string;
  days?: Day[];
  fromTime: string;
  toTime: string;
  priest: string;

  get show() {
    return `${
      this.date ? format(new Date(this.date), DATE_FORMAT, { locale: pl }) : ""
    }
    ${this.fromTime} - ${this.toTime}: ${this.title}, ${this.priest}`;
  }

  constructor({
    id,
    title,
    date,
    days,
    fromTime,
    toTime,
    priest,
  }: TConfession) {
    makeObservable(this, {
      id: observable,
      title: observable,
      days: observable,
      date: observable,
      fromTime: observable,
      toTime: observable,
      priest: observable,
      show: computed,
    });
    this.id = id;
    this.title = title;
    this.date = date;
    this.priest = priest;
    this.days = days;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }
}

export class ConfessionStore {
  confessions: Confession[] = [];

  async fetch() {
    const data = await axios.get(CONFESSIONS_API_URL);
    const confessions = data.data as TConfession[];
    if (!confessions) return false;
    this.confessions = [];
    this.confessions = confessions.map(
      (confession) => new Confession(confession)
    );
  }

  getConfessions() {
    return this.confessions;
  }

  addConfession(confession: TConfession) {
    this.confessions = [...this.confessions, new Confession(confession)];
  }

  async createConfession(confession: TCreateConfession) {
    const data = await axios.post(CONFESSIONS_API_URL, confession);
    const confessionData = data.data as TConfession;
    if (confessionData) {
      console.log("createConfession", confessionData);
      this.confessions = [...this.confessions, new Confession(confessionData)];
    } else {
      console.log("error");
    }
  }

  async updateConfession(confession: TConfession) {
    const data = await axios.put(
      `${CONFESSIONS_API_URL}/${confession.id}`,
      confession
    );
    const confessionData = data.data as TConfession;
    if (confessionData) {
      console.log("updateConfession", confessionData);
      const updatedConfession = new Confession(confessionData);
      this.confessions = this.confessions.map((c) =>
        c.id === updatedConfession.id ? updatedConfession : c
      );
    } else {
      console.log("error");
    }
  }

  async removeConfession(confession: Confession) {
    console.log("removeConfession", `${CONFESSIONS_API_URL}/${confession.id}`);
    const data = await axios.delete(`${CONFESSIONS_API_URL}/${confession.id}`);
    const confessionData = data.data as TConfession;
    if (confessionData) {
      console.log("removeConfession", confessionData);
      this.confessions = this.confessions.filter(
        (c) => c.id !== confessionData.id
      );
    } else {
      console.log("error");
    }
  }

  sortByTime(confessionA: Confession, confessionB: Confession) {
    if (
      isBefore(
        new Date(confessionA.date + " " + confessionA.fromTime),
        new Date(confessionB.date + " " + confessionB.fromTime)
      )
    ) {
      return -1;
    } else if (
      isSameMinute(
        new Date(confessionA.date + " " + confessionA.fromTime),
        new Date(confessionB.date + " " + confessionB.fromTime)
      )
    ) {
      // TODO: sort by string
      if (confessionA.title > confessionB.title) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  get getConfessionsByDay() {
    const dailyConfessionsMap = new Map<Day, Confession[]>();
    Object.values(Day).forEach((day) => {
      const selectedConfessions = this.confessions.filter((confession) =>
        confession.days?.includes(day)
      );
      dailyConfessionsMap.set(day, selectedConfessions.sort(this.sortByTime));
    });
    return dailyConfessionsMap;
  }

  get getConfessionsNextWeek() {
    const selectedConfession = this.confessions.filter(
      (confession) =>
        confession.date &&
        isBefore(new Date(confession.date), add(new Date(), { days: 7 })) &&
        isAfter(new Date(confession.date), new Date())
    );
    return selectedConfession.sort(this.sortByTime);
  }

  getConfessionsByDate({
    fromDate,
    toDate,
  }: {
    fromDate?: string;
    toDate: string;
  }) {
    const selectedConfession = this.confessions.filter(
      (confession) =>
        confession.date &&
        isAfter(new Date(confession.date), new Date(toDate)) &&
        (isBefore(new Date(confession.date), new Date(fromDate ?? "")) ||
          isSameDay(new Date(confession.date), new Date(fromDate ?? "")))
    );
    return selectedConfession.sort(this.sortByTime);
  }

  constructor() {
    makeObservable(this, {
      confessions: observable,
      fetch: action,
      getConfessions: action,
      addConfession: action,
      updateConfession: action,
      removeConfession: action,
      getConfessionsByDate: action,
      getConfessionsByDay: computed,
      getConfessionsNextWeek: computed,
    });
    this.fetch();
  }
}

const confessionStore = new ConfessionStore();
export const ConfessionStoreContext = createContext(confessionStore);
export const ConfessionStoreProvider: React.FC<{}> = ({ children }) => (
  <ConfessionStoreContext.Provider value={confessionStore}>
    {children}
  </ConfessionStoreContext.Provider>
);
