import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export enum E_NEWS_TYPE {
  "NEWS" = "NEWS",
  "ANNOUNCEMENT" = "ANNOUNCEMENT",
  "INTENTIONS" = "INTENTIONS",
}

const SNews = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [true, "News content is required"],
  },
  createdAt: {
    type: String,
    required: [true, "News createdAt is required"],
  },
  type: {
    type: String,
    required: [true, "News' type createdAt is required"],
  },
});

export type TNews = {
  title: string;
  content: string;
  createdAt: string;
  type: E_NEWS_TYPE;
};

export type TNewsRes = TNews & {
  id: string;
};

export interface INews extends Document {
  title: string;
  content: string;
  createdAt: string;
  type: E_NEWS_TYPE;
}

const News = mongoose.model<INews>("news", SNews);

export default News;
