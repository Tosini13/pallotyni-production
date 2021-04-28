import mongoose, { Document } from "mongoose";
import { TPhotograph, TPhotographCreateReq } from "./photograph";
const Schema = mongoose.Schema;

const SAlbum = new Schema({
  title: {
    type: String,
    required: [true, "Title album is required"],
  },
  description: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
    required: [true, "Photos array of album is required"],
  },
});

type TPhotographReq = TPhotograph & { id: string };
export type TAlbumReq = {
  title: string;
  description: string;
  photos: TPhotographReq[];
};

export type TAlbumBody = {
  title: string;
  description: string;
  photos: Array<string>;
};

export type TAlbum = TAlbumBody & {
  id: string;
};

export type TPhotographCreateAndAddToAlbumReq = {
  albumId: string;
  paths: string[];
};

export interface IAlbum extends Document {
  title: string;
  description: string;
  photos: Array<string>;
}

const Album = mongoose.model<IAlbum>("album", SAlbum);

export default Album;
