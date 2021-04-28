import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import { RSA_NO_PADDING } from "node:constants";
import Album from "../models/album";
import Photograph, {
  IPhotograph,
  TPhotograph,
  TPhotographRes,
} from "../models/photograph";
import {
  createPhotoAndAddToAlbumAction,
  deletePhotographAction,
} from "./actions/photographs";

export const convertPhotograph = (
  photograph: LeanDocument<IPhotograph>
): TPhotographRes => ({
  id: photograph._id,
  description: photograph.description,
  path: photograph.path,
  createdAt: photograph.createdAt,
});

export const getAllPhotographs = (req: Request, res: Response) => {
  Photograph.find({})
    .then((items) => res.send(items.map((item) => convertPhotograph(item))))
    .catch((err) => console.log(err));
};

export const getPhotographs = (req: Request, res: Response) => {
  Album.findOne({ _id: req.params.albumId })
    .then((album) => {
      console.log(album?.title);
      console.log(album?.photos);
      Photograph.find({ _id: album?.photos })
        .then((items) => res.send(items.map((item) => convertPhotograph(item))))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const createPhotograph = (req: Request, res: Response) => {
  const photograph: TPhotograph = {
    description: req.body.description,
    path: req.body.path,
    createdAt: new Date().toISOString(),
  };
  Photograph.create(photograph)
    .then((photo) => res.send(convertPhotograph(photo)))
    .catch((e) => console.log(e));
};

export const createPhotographAddToAlbum = async (
  req: Request,
  res: Response
) => {
  const photograph: TPhotograph = {
    description: req.body.description,
    path: req.body.path,
    createdAt: new Date().toISOString(),
  };
  const response = await createPhotoAndAddToAlbumAction({
    photograph,
    albumId: req.params.albumId,
  });
  console.log("response", response);
  res.send(response);
};

export const updatePhotograph = (req: Request, res: Response) => {
  const photograph: TPhotograph = {
    description: req.body.description,
    path: req.body.path,
    createdAt: new Date().toISOString(), // let user choose to update date or not
  };
  Photograph.findByIdAndUpdate({ _id: req.params.id }, photograph)
    .then((p) => {
      Photograph.findOne({ _id: req.params.id })
        .then((photo) => photo && res.send(convertPhotograph(photo)))
        .catch((err) => console.log(err));
    })
    .catch((e) => console.log(e));
};

export const deletePhotograph = async (req: Request, res: Response) => {
  const response = await deletePhotographAction({
    photographId: req.params.photographId,
    albumId: req.params.albumId,
  });
  res.send(response);
};
