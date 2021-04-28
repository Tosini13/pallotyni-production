import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SPhotograph = new Schema({
  description: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: [true, "Photograph path is required"],
  },
  createdAt: {
    type: String,
    required: false,
  },
});

export type TPhotograph = {
  description?: string;
  path: string;
  createdAt: string;
};

export type TPhotographCreateReq = Omit<TPhotograph, "createdAt">;

export type TPhotographRes = TPhotograph & {
  id: string;
};

export interface IPhotograph extends Document {
  description?: string;
  path: string;
  createdAt: string;
}

const Photograph = mongoose.model<IPhotograph>("photograph", SPhotograph);

export default Photograph;
