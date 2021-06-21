import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SPriest = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  path: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  isInFooter: {
    type: Boolean,
    required: [true, "isInFooter is required"],
  },
});

export type TPriest = {
  firstName: string;
  lastName: string;
  path?: string;
  description?: string;
  position?: string;
  isInFooter: boolean;
};

export type TPriestCreateReq = TPriest;

export type TPriestRes = TPriest & {
  id: string;
};

export interface IPriest extends Document {
  firstName: string;
  lastName: string;
  path?: string;
  description?: string;
  position?: string;
  isInFooter: boolean;
}

const Priest = mongoose.model<IPriest>("priest", SPriest);

export default Priest;
