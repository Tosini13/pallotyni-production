import React from "react";

import { action, makeObservable, observable } from "mobx";
import { Id } from "../models/Global";

import {
  TCreateImages,
  TCreatePhotograph,
  TCreatePhotographAndImage,
  TPhotograph,
  TUpdatePhotographAndImage,
} from "../models/Photograph";
import axios from "axios";
import {
  IMAGES_API_URL,
  PHOTOGRAPHS_API_URL,
  MANY_IMAGES_API_URL,
} from "../models/const";

export class Photograph {
  @observable
  id: Id;

  @observable
  createdAt: string;

  @observable
  path: string;

  @observable
  description?: string;

  constructor({ id, createdAt, path, description }: TPhotograph) {
    this.id = id;
    this.createdAt = createdAt;
    this.path = path;
    this.description = description;
  }
}

export class PhotographsStore {
  @observable
  photos: Photograph[] = [];

  async fetch() {
    const data = await axios.get(PHOTOGRAPHS_API_URL);
    const photographs = data.data as TPhotograph[];
    if (photographs) {
      this.photos = photographs.map((photograph) => new Photograph(photograph));
    } else {
      console.log("error");
    }
  }

  async createPhoto({ description, imageFile }: TCreatePhotographAndImage) {
    let formData = new FormData();
    formData.append("img", imageFile);
    const imageData = await axios.post(IMAGES_API_URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const path = imageData.data as string;
    if (path) {
      const photograph: TCreatePhotograph = {
        description,
        path: path,
      };
      const data = await axios.post(PHOTOGRAPHS_API_URL, photograph);
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        this.photos = [new Photograph(photographData), ...this.photos];
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
  }

  async createManyPhotos({ imageFiles }: TCreateImages) {
    let formData = new FormData();
    Object.values(imageFiles).forEach((imageFile) =>
      formData.append(`images`, imageFile)
    );
    const imagesData = await axios.post(MANY_IMAGES_API_URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const paths = imagesData.data as string[];
    if (paths.length) {
      return paths;
    } else {
      console.log("error image");
    }
  }

  @action
  async updatePhoto({
    id,
    description,
    path,
    imageFile,
  }: TUpdatePhotographAndImage) {
    console.log(id, description, path, imageFile);
    let formData = new FormData();
    formData.append("img", imageFile);
    const imageData = await axios.put(`${IMAGES_API_URL}/${path}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const newPath = imageData.data as string;
    console.log(newPath);
    if (newPath) {
      const photograph: TCreatePhotograph = {
        description,
        path: newPath,
      };
      const data = await axios.put(`${PHOTOGRAPHS_API_URL}/${id}`, photograph);
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        const photo = new Photograph(photographData);
        this.photos = this.photos.map((p) => (p.id === photo.id ? photo : p));
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
    // TODO: delete old image file
  }

  async removePhoto(photograph: Photograph) {
    const imageData = await axios.delete(
      `${IMAGES_API_URL}/${photograph.path}`
    );
    const path = imageData.data as string;
    console.log(path);
    if (path) {
      const data = await axios.delete(
        `${PHOTOGRAPHS_API_URL}/${photograph.id}`
      );
      const photographData = data.data as TPhotograph;
      console.log(photographData);
      if (photographData) {
        this.photos = this.photos.filter((p) => p.id !== photographData.id);
      } else {
        console.log("error photo");
      }
    } else {
      console.log("error image");
    }
  }

  @action
  getPhotos() {
    return this.photos as Photograph[];
  }

  constructor() {
    makeObservable(this, {
      photos: observable,
      fetch: action,
      createPhoto: action,
      updatePhoto: action,
      removePhoto: action,
    });
    this.fetch();
  }
}

export const albumStore = new PhotographsStore();
export const AlbumStoreContext = React.createContext(albumStore);
export const AlbumStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <AlbumStoreContext.Provider value={albumStore}>
      {children}
    </AlbumStoreContext.Provider>
  );
};
