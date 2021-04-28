import Album, { TAlbumBody, TAlbum } from "../../models/album";
import { convertAlbum } from "../album";
import { ActionResponse } from "./types.help";

// ################## CREATE ###################### TODO

// ################## READ ######################

export const getAlbumsAction = async (): ActionResponse<TAlbum[] | null> => {
  try {
    const albums = await Album.find({});
    return albums && albums.map((album) => convertAlbum(album));
  } catch (e) {
    console.log(e);
    return e;
  }
};

type TGetAlbumActionParams = { id: string };
export const getAlbumAction = async ({
  id,
}: TGetAlbumActionParams): ActionResponse<TAlbum | null> => {
  try {
    const album = await Album.findOne({ _id: id });
    return album && convertAlbum(album);
  } catch (e) {
    throw new Error(e);
  }
};

// ################## UPDATE ######################

type TUpadteAlbumActionParams = { album: TAlbumBody; id: string };
export const upadteAlbumAction = async ({
  id,
  album,
}: TUpadteAlbumActionParams): ActionResponse<TAlbum | null> => {
  try {
    await Album.findByIdAndUpdate({ _id: id }, album);
    const updatedAlbum = await Album.findOne({ _id: id });
    return updatedAlbum && convertAlbum(updatedAlbum);
  } catch (e) {
    console.log(e);
    return e;
  }
};

// ################## DELETE ###################### TODO
