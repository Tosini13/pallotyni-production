import { Id } from "./Global";

export type TNews = {
  id: Id;
  title: string;
  content: string;
  createdAt: string;
};

export type TNewsCreate = Omit<TNews, "id" | "createdAt">;
