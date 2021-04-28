import Photograph, {
  TPhotograph,
  TPhotographRes,
} from "../../models/photograph";
import { getAlbumAction, upadteAlbumAction } from "./albums";
import { ActionResponse } from "./types.help";
import { convertPhotograph } from "../photograph";

// ################## CREATE ######################

type TCreatePhotoAndAddToAlbumActionParams = {
  photograph: TPhotograph;
  albumId: string;
};
export const createPhotoAndAddToAlbumAction = async ({
  photograph,
  albumId,
}: TCreatePhotoAndAddToAlbumActionParams): ActionResponse<TPhotograph> => {
  try {
    const album = await getAlbumAction({ id: albumId });
    //WHAT IF album is ERROR?
    if (album) {
      const photo = await Photograph.create(photograph);
      const newPhoto = convertPhotograph(photo);
      await upadteAlbumAction({
        id: albumId,
        album: {
          ...album,
          photos: [newPhoto.id, ...album.photos],
        },
      });
      return newPhoto;
    }
    throw new Error(`There is no album with id=${albumId}`);
  } catch (e) {
    throw new Error(e);
  }
};

// ################## READ ###################### TODO
// ################## UPADTE ###################### TODO
// ################## DELETE ######################

type TDeletePhotographActionParams = {
  photographId: string;
  albumId: string;
};
export const deletePhotographAction = async ({
  photographId,
  albumId,
}: TDeletePhotographActionParams): ActionResponse<TPhotographRes | null> => {
  try {
    const album = await getAlbumAction({ id: albumId });
    if (!album) {
      throw new Error(`There is no album with id=${albumId}`);
    }
    const photograph = await Photograph.findByIdAndRemove({
      _id: photographId,
    });
    if (photograph) {
      await upadteAlbumAction({
        id: albumId,
        album: {
          ...album,
          photos: album.photos.filter((photo) => photo !== photograph.id),
        },
      });
      return photograph && convertPhotograph(photograph);
    }
    throw new Error(`There is no photograph with id=${photographId}`);
  } catch (e) {
    throw new Error(e);
  }
};
