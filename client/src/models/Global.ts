export type Id = string;

export const DATE_TIME_FORMAT = "yyyy.MMM.dd HH:mm"; // "DD.MM.YYYY"
export const DATE_FORMAT = "yyyy-MMM-dd";
export const TIME_FORMAT = "HH:mm";

export enum RoutingPath {
  home = "/",
  stellaMaris = "/stella-maris",
  service = "/services",
  confessions = "/confessions",
  priests = "/priests",
  gallery = "/gallery",
  news = "/news",
  announcements = "/announcements",
  album = "/albums/:id",
  login = "/login",
  resetPassword = "/reset-password",
}

export const GetRoute = {
  album: (id: string) => `/albums/${id}`,
};

export enum Day {
  mon = "MONDAY",
  tue = "TUESDAY",
  wed = "WEDNESDAY",
  thu = "THURSDAY",
  fri = "FRIDAY",
  sat = "SATURDAY",
  sun = "SUNDAY",
}

export type Repeatability = {
  days: Day;
  everyday: boolean;
};
