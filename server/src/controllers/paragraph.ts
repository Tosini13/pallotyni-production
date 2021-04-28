import { Request, Response } from "express";
import Paragraph, { TParagraph } from "../models/paragraph";

export const getParagraph = (req: Request, res: Response) => {
  Paragraph.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
};

export const createParagraph = (req: Request, res: Response) => {
  const paragraph: TParagraph = {
    title: req.body.title,
    content: req.body.content,
  };

  Paragraph.create(paragraph, (err, addedParagraph) => {
    if (err) {
      console.log(err);
    } else {
      res.send(addedParagraph);
    }
  });
};

export const updateParagraph = (req: Request, res: Response) => {
  const paragraph: TParagraph = {
    title: req.body.title,
    content: req.body.content,
  };

  Paragraph.findByIdAndUpdate({ _id: req.params.id }, paragraph)
    .then((p: any) => {
      Paragraph.findOne({ _id: req.params.id })
        .then((p: any) => res.send(p))
        .catch((err: any) => console.log(err));
    })
    .catch((err: any) => console.log(err));
};

export const deleteParagraph = (req: Request, res: Response) => {
  Paragraph.findByIdAndRemove({ _id: req.params.id })
    .then((p: any) => res.send(p))
    .catch((err: any) => console.log(err));
};
