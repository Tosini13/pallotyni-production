import React from "react";
import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import { IMAGES_API_URL, PRIESTS_API_URL } from "../models/const";
import { Id } from "../models/Global";
import {
  TPriest,
  TCreatePriestAndImage,
  TPriestCreateApiParams,
  TPriestUpdate,
  TCreatePriest,
} from "../models/Priest";

export class Priest {
  id: Id;

  firstName: string;

  lastName: string;

  path?: string;

  position?: string;

  constructor({ id, firstName, lastName, path, position }: TPriest) {
    makeObservable(this, {
      id: observable,
      firstName: observable,
      lastName: observable,
      position: observable,
    });
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.path = path;
    this.position = position;
  }
}

class PriestsStore {
  priests: Priest[] = [];

  async fetch() {
    const data = await axios.get(PRIESTS_API_URL);
    const priestsData = data.data as TPriest[];
    if (priestsData) {
      this.priests = priestsData.map((item) => new Priest(item));
    } else {
      console.log("error");
    }
  }

  async createPriest(priestData: TCreatePriestAndImage) {
    let priest: TPriestCreateApiParams = {
      firstName: priestData.firstName,
      lastName: priestData.lastName,
      position: priestData.position,
    };
    if (priestData.imageFile) {
      try {
        const path = await this.uploadPhoto(priestData.imageFile);
        priest.path = path;
      } catch (e) {
        console.log("error image!", e);
        return false;
      }
    }

    try {
      const data = await axios.post(`${PRIESTS_API_URL}`, priest);
      const priestCreatedData = data.data as TPriest;
      if (priestCreatedData) {
        this.priests = [new Priest(priestCreatedData), ...this.priests];
      }
    } catch (e) {
      console.log("error priest", e);
    }
  }

  async uploadPhoto(imageFile: any) {
    let formData = new FormData();
    formData.append("img", imageFile);
    const imageData = await axios.post(IMAGES_API_URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return imageData.data as string;
  }

  @action
  async updatePriest({
    id,
    firstName,
    lastName,
    position,
    path,
    imageFile,
  }: TPriestUpdate) {
    let updatedPath = path as string;
    if (imageFile) {
      let formData = new FormData();
      formData.append("img", imageFile);
      const pathToDelete = this.priests.find(
        (priest) => priest.id === id
      )?.path;
      if (path && pathToDelete) {
        formData.append("deleteImage", pathToDelete);
      }
      const imageData = await axios.put(IMAGES_API_URL, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      updatedPath = imageData.data as string;
    }
    const priest: TCreatePriest = {
      firstName: firstName,
      lastName: lastName,
      position: position,
      path: updatedPath,
    };
    const data = await axios.put(`${PRIESTS_API_URL}/${id}`, priest);
    const priestData = data.data as TPriest;
    if (priestData) {
      const priest = new Priest(priestData);
      this.priests = this.priests.map((p) => (p.id === priest.id ? priest : p));
    } else {
      console.log("error photo");
    }
    // TODO: delete old image file
  }

  async deletePriest(priest: Priest) {
    console.log("###############################");
    console.log("priest", priest);
    const data = await axios.delete(`${PRIESTS_API_URL}/${priest.id}`);
    console.log("###############################");
    console.log("data", data);
    const priestData = data.data as TPriest;
    if (priestData) {
      this.priests = this.priests.filter((p) => p.id !== priestData.id);
    } else {
      console.log("error");
    }
  }

  constructor() {
    makeObservable(this, {
      priests: observable,
      fetch: action,
      createPriest: action,
      deletePriest: action,
    });
  }
}

const priestsStore = new PriestsStore();

export const PriestContext = createContext(priestsStore);
export const PriestProvider: React.FC<{}> = ({ children }) => (
  <PriestContext.Provider value={priestsStore}>
    {children}
  </PriestContext.Provider>
);
