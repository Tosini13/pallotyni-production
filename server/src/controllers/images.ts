import fs from "fs";
import { format } from "date-fns";
import { Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";
import path from "path";
import { s3 } from "../..";
import { S3 } from "aws-sdk";
import { deleteImageAWS, uploadimageAWS } from "./actions/images";
import { Console } from "node:console";

const galleryDir = "gallery";
export const AWS_GALLERY_ROOT = "amazonaws.com/";

export const initNodeGallery = () => {
  const galleryPath = `./${galleryDir}`;
  if (!fs.existsSync(galleryPath)) {
    fs.mkdirSync(galleryPath);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryDir);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.replace("image/", "");
    const originalName = file.originalname.replace(" ", "_").replace("/", "_");
    const filename = `${originalName}_${format(new Date(), DATE_FILE_NAME)}`;
    cb(null, `${filename}.${extension}`);
  },
});

export const multerConfig = multer({
  storage: multerStorage,
});

export const uploadImage = async (req: Request, res: Response) => {
  const file = await uploadimageAWS({
    path: req.file.path,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
  });
  res.send(file.Location);
};

export const uploadImages = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Is it ok?!?
  let promises: any[] = [];
  files.forEach((file) => {
    console.log(file);
    promises.push(
      uploadimageAWS({
        path: file.path,
        filename: file.filename,
        mimetype: file.mimetype,
      })
    );
  });

  Promise.all(promises)
    .then((data) => {
      res.send(data.map((img) => img.Location));
    })
    .catch((e) => {
      throw Error(e);
    });
};

export const updateImage = async (req: Request, res: Response) => {
  const key = req.body.deleteImage.split(AWS_GALLERY_ROOT)[1];
  await deleteImageAWS({ key });
  const file = await uploadimageAWS({
    path: req.file.path,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
  });
  res.send(file.Location);
};

export const deleteImage = async (req: Request, res: Response) => {
  const path = req?.query?.path as string | undefined;
  console.log("path", path);
  if (path) {
    const key = path.split(AWS_GALLERY_ROOT)[1];
    await deleteImageAWS({ key });
    res.send(req.query.path);
  } else {
    res.send(new Error("wrong path"));
  }
};
