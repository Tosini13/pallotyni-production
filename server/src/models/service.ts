import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SService = new Schema({
  title: {
    type: String,
    required: [true, "Service title is required"],
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
  time: {
    type: String,
    required: [true, "Service time is required"],
  },
  priest: {
    type: String,
    required: false,
  },
  period: {
    type: String,
    required: false,
  },
});

export type TService = {
  title: string;
  time: string;
  days?: string[];
  date?: string;
  priest: string;
  period?: string;
};

export type TServiceRes = TService & {
  id: string;
};

export interface IService extends Document {
  title: string;
  time: string;
  days?: string[];
  date?: string;
  priest: string;
  period?: string;
}

const Service = mongoose.model<IService>("service", SService);

export default Service;
