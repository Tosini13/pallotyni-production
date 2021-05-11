import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { IMAGES_API_URL, PRIESTS_API_URL } from "../models/const";
import { Id } from "../models/Global";
import {
  TPriest,
  TPriestCreate,
  TPriestCreateApiParams,
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

class PriestStore {
  priests: Priest[] = [];

  async fetch() {}

  async createPriest(priestData: TPriestCreate) {
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

  constructor() {
    makeObservable(this, {
      priests: observable,
      fetch: action,
      createPriest: action,
    });
  }
}
