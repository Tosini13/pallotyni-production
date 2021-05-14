import { Id } from "./Global";

export enum E_NEWS_TYPE {
  "NEWS" = "NEWS",
  "ANNOUNCEMENT" = "ANNOUNCEMENT",
}

export type TNews = {
  id: Id;
  title: string;
  content: string;
  createdAt: string;
  type: E_NEWS_TYPE;
};

export type TNewsCreate = Omit<TNews, "id" | "createdAt">;
