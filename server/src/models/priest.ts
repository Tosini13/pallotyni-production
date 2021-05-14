import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SPriest = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName path is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName path is required"],
  },
  path: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
});

export type TPriest = {
  firstName: string;
  lastName: string;
  path?: string;
  position?: string;
};

export type TPriestCreateReq = TPriest;

export type TPriestRes = TPriest & {
  id: string;
};

export interface IPriest extends Document {
  firstName: string;
  lastName: string;
  path?: string;
  position?: string;
}

const Priest = mongoose.model<IPriest>("priest", SPriest);

export default Priest;
