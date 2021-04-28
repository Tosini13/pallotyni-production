import React from "react";
import axios from "axios";

import { action, makeObservable, observable } from "mobx";
import { Id } from "../models/Global";
import {
  ALBUM_API_URL,
  ADD_MANY_PHOTOS_TO_ALBUM_API_URL,
  urlAlbumPhotographs,
} from "../models/const";
import {
  TAlbum,
  TAlbumCreate,
  TAlbumProps,
  TAlbumUpdateParams,
  TAlbumUpdateQueryParams,
} from "../models/Album";
import { TPhotograph } from "../models/Photograph";
import { Photograph } from "./PhotographsStore";

type TAddPhotosToAlbum = {
  albumId: Id;
  photosPaths: string[];
};

export class Album {
  id: Id;
  title: string;
  description: string;
  coverPhoto?: Photograph;
  photos: string[];

  async getCoverPhoto(albumId: Id) {
    const data = await axios.get(urlAlbumPhotographs({ albumId }));
    const photograph = data.data[0] as TPhotograph;
    if (photograph) {
      this.coverPhoto = new Photograph(photograph);
    } else {
      console.log("error");
    }
  }

  constructor({ id, title, description, photos }: TAlbumProps) {
    makeObservable(this, {
      id: observable,
      title: observable,
      description: observable,
      coverPhoto: observable,
      photos: observable,
      getCoverPhoto: action,
    });
    this.id = id;
    this.title = title;
    this.description = description;
    this.photos = photos;
    this.getCoverPhoto(id);
  }
}

export class AlbumStore {
  albums: Album[] = [];

  async fetch() {
    const data = await axios.get(ALBUM_API_URL);
    const albumsData = data.data as TAlbum[];
    if (albumsData) {
      this.albums = albumsData.map((item) => new Album(item));
    } else {
      console.log("error");
    }
  }

  @action
  getAlbums() {
    return this.albums;
  }

  @action
  getAlbumsWithPhotos() {
    return this.albums.filter((album) => album.photos.length);
  }

  @action
  getAlbumsWithoutPhotos() {
    return this.albums.filter((album) => !album.photos.length);
  }

  @action
  getLatestAlbum(quantity: number) {
    return this.albums.slice(0, quantity);
  }

  @action
  getAlbum(id: Id) {
    return this.albums.find((album) => album.id === id);
  }

  async createAlbum(album: TAlbumCreate) {
    const data = await axios.post(ALBUM_API_URL, album);
    const albumData = data.data as TAlbum;
    if (albumData) {
      this.albums = [new Album(albumData), ...this.albums];
    } else {
      console.log("error");
    }
  }

  async updateAlbum(album: TAlbumUpdateParams) {
    const selectedAlbum = this.albums.find((a) => a.id === album.id);
    const updatedAlbum: TAlbumUpdateQueryParams = {
      id: album.id,
      title: album.title,
      description: album.description,
      photos: selectedAlbum?.photos ?? [],
    };
    const data = await axios.put(
      `${ALBUM_API_URL}/${updatedAlbum.id}`,
      updatedAlbum
    );
    const albumData = data.data as TAlbum;
    if (albumData) {
      const newAlbum = new Album(albumData);
      this.albums = this.albums.map((a) =>
        a.id === newAlbum.id ? newAlbum : a
      );
    } else {
      console.log("error");
    }
  }

  async addPhotos({ albumId, photosPaths }: TAddPhotosToAlbum) {
    const data = await axios.put(
      `${ADD_MANY_PHOTOS_TO_ALBUM_API_URL}/${albumId}`,
      photosPaths
    );
    const albumData = data.data as TAlbum;
    if (albumData) {
      const newAlbum = new Album(albumData);
      this.albums = this.albums.map((a) =>
        a.id === newAlbum.id ? newAlbum : a
      );
    } else {
      console.log("error");
    }
  }

  async deleteAlbum(album: Album) {
    const data = await axios.delete(`${ALBUM_API_URL}/${album.id}`);
    const albumData = data.data as TAlbum;
    if (albumData) {
      this.albums = this.albums.filter((n) => n.id !== albumData.id);
    } else {
      console.log("error");
    }
  }

  constructor() {
    makeObservable(this, {
      albums: observable,
      fetch: action,
      createAlbum: action,
      updateAlbum: action,
      deleteAlbum: action,
    });
    this.fetch();
  }
}

export const albumStore = new AlbumStore();
export const AlbumStoreContext = React.createContext(albumStore);
export const AlbumStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <AlbumStoreContext.Provider value={albumStore}>
      {children}
    </AlbumStoreContext.Provider>
  );
};
