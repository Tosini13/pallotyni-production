import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Album, {
  IAlbum,
  TAlbumBody,
  TAlbum,
  TAlbumReq,
  TPhotographCreateAndAddToAlbumReq,
} from "../models/album";
import Photograph, { TPhotograph } from "../models/photograph";
import {
  upadteAlbumAction,
  getAlbumsAction,
  getAlbumAction,
} from "./actions/albums";
import { AWS_GALLERY_ROOT } from "./images";
import { deleteImageAWS } from "./actions/images";
const ObjectID = require("mongodb").ObjectID;

export const convertAlbum = (album: LeanDocument<IAlbum>): TAlbum => ({
  id: album._id,
  title: album.title,
  description: album.description,
  photos: album.photos,
});

export const getAlbums = async (req: Request, res: Response) => {
  const response = await getAlbumsAction();
  res.send(response);
};

export const getAlbum = async (req: Request, res: Response) => {
  const response = await getAlbumAction({ id: req.params.id });
  res.send(response);
};

export const createAlbum = (req: Request, res: Response) => {
  const album: TAlbumBody = {
    title: req.body.title,
    description: req.body.description,
    photos: [],
  };

  Album.create(album)
    .then((n) => res.send(convertAlbum(n)))
    .catch((e) => console.log(e));
};

export const updateAlbum = async (req: Request, res: Response) => {
  const album: TAlbumBody = {
    title: req.body.title,
    description: req.body.description,
    photos: req.body.photos || [],
  };

  const response = await upadteAlbumAction({ id: req.params.id, album });
  res.send(response);
};

export const createManyPhotographsAndAddToAlbum = async (
  req: Request,
  res: Response
) => {
  const paths: string[] = req.body;
  const photographs: TPhotograph[] = paths.map((path) => ({
    path: path,
    createdAt: new Date().toISOString(),
  }));
  try {
    const photographsData = await Photograph.insertMany(photographs);
    const albumToUpdate = await Album.findOne({ _id: req.params.id });
    if (!albumToUpdate) return false;
    const album: TAlbumBody = {
      title: albumToUpdate.title,
      description: albumToUpdate.description,
      photos: [
        ...albumToUpdate.photos,
        ...photographsData.map((photo) => photo._id.toString()),
      ],
    };
    const oldAlbum = await Album.findByIdAndUpdate(
      { _id: req.params.id },
      album
    );
    console.log("OK");
    res.send(oldAlbum);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAlbum = (req: Request, res: Response) => {
  // TODO: Delete all the file from the album
  Album.findByIdAndRemove({ _id: req.params.id })
    .then(async (album) => {
      if (album) {
        const photos = await Photograph.find({ _id: album.photos });
        Photograph.deleteMany({ _id: album.photos })
          .then((response) => {
            const rootPath = path.dirname(require.main?.filename ?? "");
            photos.forEach(async (photo) => {
              const key = photo.path.split(AWS_GALLERY_ROOT)[1];
              try {
                console.log("UPLOADING ===========> ", key);
                await deleteImageAWS({ key });
              } catch (e) {
                console.log("ERROR ===========> ", e);
                throw Error(e);
              }
            });
            // TODO: probably it makes warning
            res.send({ album: convertAlbum(album), photos });
          })
          .catch((err) => {
            res.send(convertAlbum(album));
          });
      }
      res.send(album);
    })
    .catch((e) => console.log("e", e));
};
