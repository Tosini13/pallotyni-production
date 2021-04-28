import { createContext } from "react";
import { action, observable, makeObservable } from "mobx";
import axios from "axios";

import { Id } from "../models/Global";
import { mockParagraphs } from "../mockData/aboutUs";
import { PARAGRAPH_API_URL } from "../models/const";
import {
  TParagraph,
  TParagraphCreate,
  TParagraphMongo,
  TParagraphBodyMongo,
} from "../models/Paragraph";

export class Paragraph {
  @observable
  id: Id;

  @observable
  title?: string;

  @observable
  content: string;

  constructor(info: TParagraph) {
    this.id = info.id;
    this.title = info.title;
    this.content = info.content;
  }
}

export class ParagraphStore {
  paragraphs: Paragraph[] = [];

  getParagraph() {
    return this.paragraphs;
  }

  async fetch() {
    const data = await axios.get(PARAGRAPH_API_URL);
    const paragraphs: TParagraphMongo[] = data.data;
    if (!paragraphs) return false;
    this.paragraphs = paragraphs.map(
      (p) =>
        new Paragraph({
          ...p,
          id: p._id,
        })
    );
  }

  async createParagraph(p: TParagraphCreate) {
    const body: TParagraphBodyMongo = {
      title: p.title,
      content: p.content,
    };
    const data = await axios.post(PARAGRAPH_API_URL, body);
    const paragraph: TParagraphMongo = data.data;
    if (paragraph) {
      this.paragraphs = [
        ...this.paragraphs,
        new Paragraph({
          ...paragraph,
          id: paragraph._id,
        }),
      ];
    } else {
      console.log("Error Message");
    }
  }

  async updateParagraph(p: TParagraph) {
    const body: TParagraphBodyMongo = {
      title: p.title,
      content: p.content,
    };
    const data = await axios.put(`${PARAGRAPH_API_URL}/${p.id}`, body);
    const paragraphData: TParagraphMongo = data.data;
    if (paragraphData) {
      const paragraph = new Paragraph({
        ...paragraphData,
        id: paragraphData._id,
      });
      this.paragraphs = this.paragraphs.map((item) =>
        item.id === paragraph.id ? paragraph : item
      );
    } else {
      console.log("Error Message");
    }
  }

  async removeParagraph(p: TParagraph) {
    const data = await axios.delete(`${PARAGRAPH_API_URL}/${p.id}`);
    const paragraphData: TParagraphMongo = data.data;
    if (paragraphData) {
      this.paragraphs = this.paragraphs.filter(
        (paragraph) => paragraph.id !== paragraphData._id
      );
    } else {
      console.log("Error Message");
    }
  }

  constructor() {
    makeObservable(this, {
      paragraphs: observable,
      fetch: action,
      createParagraph: action,
      updateParagraph: action,
      removeParagraph: action,
    });
    this.fetch();
  }
}

const paragraphStore = new ParagraphStore();
export const ParagraphStoreContext = createContext(paragraphStore);
export const ParagraphStoreProvider: React.FC<{}> = ({ children }) => (
  <ParagraphStoreContext.Provider value={paragraphStore}>
    {children}
  </ParagraphStoreContext.Provider>
);
