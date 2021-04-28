import fs from "fs";
import { format } from "date-fns";
import { Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";
import path from "path";

const galleryDir = "gallery";

export const initNodeGallery = () => {
  if (fs.existsSync(galleryDir)) {
    fs.mkdirSync(`./${galleryDir}`);
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

export const uploadImage = (req: Request, res: Response) => {
  res.send(req.file.filename);
};

export const uploadImages = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[]; // Is it ok?!?
  res.send(files.map((file) => file.filename));
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
