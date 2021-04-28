import { Id } from "./Global";

export type TParagraph = {
  id: Id;
  title?: string;
  content: string;
};

export type TParagraphCreate = Omit<TParagraph, "id">;
export type TParagraphMongo = Omit<TParagraph, "id"> & {
  _id: string;
};
export type TParagraphBodyMongo = Omit<TParagraph, "id">;
