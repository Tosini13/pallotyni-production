import { format } from "date-fns";
import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { DATE_TIME_FORMAT } from "../models/global";
import News, { INews, TNews, TNewsRes } from "../models/news";

const convertNews = (news: LeanDocument<INews>): TNewsRes => ({
  id: news._id,
  title: news.title,
  content: news.content,
  createdAt: news.createdAt,
});

export const getAllNews = (req: Request, res: Response) => {
  News.find({})
    .then((items) => res.send(items.map((item) => convertNews(item))))
    .catch((err) => console.log(err));
};

export const createNews = (req: Request, res: Response) => {
  const news: TNews = {
    title: req.body.title,
    content: req.body.content,
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  };

  News.create(news)
    .then((n) => res.send(convertNews(n)))
    .catch((e) => console.log(e));
};

export const updateNews = (req: Request, res: Response) => {
  const news: TNews = {
    title: req.body.title,
    content: req.body.content,
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  };

  News.findByIdAndUpdate({ _id: req.params.id }, news)
    .then((oldNews) => {
      News.findOne({ _id: req.params.id })
        .then(
          (updatedNews) => updatedNews && res.send(convertNews(updatedNews))
        )
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

export const deleteNews = (req: Request, res: Response) => {
  News.findByIdAndRemove({ _id: req.params.id })
    .then((n) => n && res.send(convertNews(n)))
    .catch((e) => console.log(e));
};
