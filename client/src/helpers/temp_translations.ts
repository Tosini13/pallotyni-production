import { Day } from "../models/Global";

export const translateDays = (day: Day) => {
  enum EPLDays {
    "MONDAY" = "PONIEDZIAŁEK",
    "TUESDAY" = "WTOREK",
    "WEDNESDAY" = "ŚRODA",
    "THURSDAY" = "CZWARTEK",
    "FRIDAY" = "PIĄTEK",
    "SATURDAY" = "SOBOTA",
    "SUNDAY" = "NIEDZIELA",
  }
  return EPLDays[day];
};
