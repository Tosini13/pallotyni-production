import { Photograph } from "../stores/PhotographsStore";
import { Id } from "./Global";

export type TAlbum = {
  id: Id;
  title: string;
  description: string;
  photos: string[];
};

export type TAlbumUpdateParams = Omit<TAlbum, "photos">;
export type TAlbumUpdateQueryParams = Omit<TAlbum, "photos"> & {
  photos: Id[];
};
export type TAlbumCreate = Omit<TAlbum, "id" | "photos">;

export type TAlbumProps = Omit<TAlbum, "createdAt"> & {
  createdAt?: string;
};
