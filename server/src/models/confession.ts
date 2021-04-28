import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SConfession = new Schema({
  title: {
    type: String,
    required: [true, "Confession title is required"],
  },
  date: {
    type: String,
    required: false,
  },
  days: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },
  fromTime: {
    type: String,
    required: [true, "Confession fromTime is required"],
  },
  toTime: {
    type: String,
    required: [true, "Confession fromTime is required"],
  },
  priest: {
    type: String,
    required: false,
  },
});

export type TConfession = {
  title: string;
  date?: string;
  days?: string[];
  fromTime: string;
  toTime: string;
  priest: string;
};

export type TConfessionRes = TConfession & {
  id: string;
};

export interface IConfession extends Document {
  title: string;
  date?: string;
  days?: string[];
  fromTime: string;
  toTime: string;
  priest: string;
}

const Confession = mongoose.model<IConfession>("confession", SConfession);

export default Confession;
