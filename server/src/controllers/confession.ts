import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Confession, {
  IConfession,
  TConfession,
  TConfessionRes,
} from "../models/confession";

const convertConfession = (
  confession: LeanDocument<IConfession>
): TConfessionRes => {
  return {
    id: confession._id,
    days: confession.days?.length ? confession.days : undefined,
    date: confession.date ?? undefined,
    priest: confession.priest,
    title: confession.title,
    fromTime: confession.fromTime,
    toTime: confession.toTime,
  };
};

export const getConfession = (req: Request, res: Response) => {
  Confession.find({})
    .then((confessions) =>
      res.send(confessions.map((confession) => convertConfession(confession)))
    )
    .catch((err) => console.log(err));
};

export const createConfession = (req: Request, res: Response) => {
  const confession: TConfession = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    priest: req.body.priest,
  };
  Confession.create(confession)
    .then((c) => res.send(convertConfession(c)))
    .catch((err) => console.log(err));
};

export const updateConfession = (req: Request, res: Response) => {
  const confession: TConfession = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    priest: req.body.priest,
  };
  Confession.findByIdAndUpdate({ _id: req.params.id }, confession)
    .then((c) => {
      Confession.findOne({ _id: req.params.id })
        .then((c) => c && res.send(convertConfession(c)))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const deleteConfession = (req: Request, res: Response) => {
  Confession.findByIdAndRemove({ _id: req.params.id })
    .then((c) => c && res.send(convertConfession(c)))
    .catch((err) => console.log(err));
};
