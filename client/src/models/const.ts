import { Id } from "./Global";

// ======================== URL ===========================
const SERVER_URL = "";
const API_URL = `${SERVER_URL}/api`;
export const PARAGRAPH_API_URL = `${API_URL}/paragraphs`;
export const SERVICES_API_URL = `${API_URL}/services`;
export const CONFESSIONS_API_URL = `${API_URL}/confessions`;
export const NEWS_API_URL = `${API_URL}/news`;
export const ALBUM_API_URL = `${API_URL}/albums`;
export const ADD_MANY_PHOTOS_TO_ALBUM_API_URL = `${API_URL}/albumsAddManyPhotos`;
export const IMAGES_API_URL = `${API_URL}/images`;
export const MANY_IMAGES_API_URL = `${API_URL}/many-images`;
export const PHOTOGRAPHS_API_URL = `${API_URL}/photographs`;
export const PRIESTS_API_URL = `${API_URL}/priests`;
export const ALBUM_PHOTOGRAPHS_API_URL = `${API_URL}/albums/:albumId/photographs/:photographId`;

export const FOOTER_API_URL = `${API_URL}/footer`;

type TUrlAlbumPhotographParams = { photographId: Id; albumId: Id };
export const urlAlbumPhotograph = ({
  photographId,
  albumId,
}: TUrlAlbumPhotographParams) => {
  return `${API_URL}/albums/${albumId}/photographs/${photographId}`;
};

type TAlbumPhotographsUrlParams = { albumId: Id };
export const urlAlbumPhotographs = ({
  albumId,
}: TAlbumPhotographsUrlParams) => {
  return `${API_URL}/albums/${albumId}/photographs`;
};

// ======================== AUTH ===========================
export enum EUserAuth {
  "LOGGED_IN" = "LOGGED_IN",
  "LOGGED_OUT" = "LOGGED_OUT",
  "WRONG_PASSWORD" = "WRONG_PASSWORD",
  "PASSWORD_RESET_SUCCESS" = "PASSWORD_RESET_SUCCESS",
  "PASSWORD_RESET_ERROR" = "PASSWORD_RESET_ERROR",
}
