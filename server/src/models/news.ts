import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

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
});

export type TNews = {
  title: string;
  content: string;
  createdAt: string;
};

export type TNewsRes = TNews & {
  id: string;
};

export interface INews extends Document {
  title: string;
  content: string;
  createdAt: string;
}

const News = mongoose.model<INews>("news", SNews);

export default News;
