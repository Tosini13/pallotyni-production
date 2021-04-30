import fs from "fs";
import { format } from "date-fns";
import { Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";
import path from "path";
import { s3 } from "../..";
import { S3 } from "aws-sdk";
import { uploadimageAWS } from "./actions/images";

const galleryDir = "gallery";

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

export const updateImage = (req: Request, res: Response) => {
  const rootPath = path.dirname(require.main?.filename ?? "");
  fs.unlink(`${rootPath}\\gallery\\${req.params.path}`, () => {
    res.send(req.file.filename);
  });
};

export const deleteImage = (req: Request, res: Response) => {
  const rootPath = path.dirname(require.main?.filename ?? "");
  fs.unlink(`${rootPath}\\gallery\\${req.params.path}`, () =>
    res.send(req.params.path)
  );
};
