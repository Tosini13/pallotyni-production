import React from "react";
import axios from "axios";
import { format, isAfter } from "date-fns";

import { action, computed, makeObservable, observable } from "mobx";
import { E_NEWS_TYPE, TNews, TNewsCreate } from "../models/News";
import { DATE_TIME_FORMAT, Id } from "../models/Global";
import { NEWS_API_URL } from "../models/const";

type TNewsProps = Omit<TNews, "createdAt"> & {
  createdAt?: string;
};

export class News {
  @observable
  id: Id;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  createdAt: string;

  @observable
  type: E_NEWS_TYPE;

  constructor({ id, title, content, type, createdAt }: TNewsProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.type = type;
    this.createdAt = createdAt ?? format(new Date(), DATE_TIME_FORMAT);
  }
}

export class NewsStore {
  news: News[] = [];

  async fetch() {
    const data = await axios.get(NEWS_API_URL);
    const newsData = data.data as TNews[];
    if (newsData) {
      this.news = newsData.map((item) => new News(item));
    } else {
      console.log("error");
    }
  }

  get getAllNews() {
    return this.news.filter((news) => news.type === E_NEWS_TYPE.NEWS);
  }

  get getAllAnnouncements() {
    return this.news.filter((news) => news.type === E_NEWS_TYPE.ANNOUNCEMENT);
  }

  get getAllIntentions() {
    return this.news.filter((news) => news.type === E_NEWS_TYPE.INTENTION);
  }
  getLatestNews() {
    if (!this.news.length) {
      return null;
    }
    let latestNews = this.news[0];
    this.news.forEach((news) => {
      if (isAfter(new Date(news.createdAt), new Date(latestNews.createdAt))) {
        latestNews = news;
      }
    });
    return latestNews;
  }

  getNews(id: Id) {
    return this.news.find((news) => news.id === id);
  }

  async createNews(news: TNewsCreate) {
    const data = await axios.post(NEWS_API_URL, news);
    const newsData = data.data as TNews;
    if (newsData) {
      this.news = [new News(newsData), ...this.news];
    } else {
      console.log("error");
    }
  }

  async updateNews(news: TNews) {
    const data = await axios.put(`${NEWS_API_URL}/${news.id}`, news);
    const newsData = data.data as TNews;
    if (newsData) {
      const newNews = new News(newsData);
      this.news = this.news.map((n) => (n.id === newNews.id ? newNews : n));
    } else {
      console.log("error");
    }
  }

  async deleteNews(news: News) {
    const data = await axios.delete(`${NEWS_API_URL}/${news.id}`);
    const newsData = data.data as TNews;
    if (newsData) {
      this.news = this.news.filter((n) => n.id !== newsData.id);
    } else {
      console.log("error");
    }
  }

  constructor() {
    makeObservable(this, {
      news: observable,
      fetch: action,
      createNews: action,
      updateNews: action,
      deleteNews: action,
      getAllNews: computed,
      getAllAnnouncements: computed,
      getAllIntentions: computed,
    });
    this.fetch();
  }
}

export const newsStore = new NewsStore();
export const NewStoreContext = React.createContext(newsStore);
export const NewStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <NewStoreContext.Provider value={newsStore}>
      {children}
    </NewStoreContext.Provider>
  );
};
