import fs from "fs";
import { format } from "date-fns";
import { Request, Response } from "express";
import multer from "multer";
import { DATE_FILE_NAME } from "../models/global";
import path from "path";
import { s3 } from "../..";
import { S3 } from "aws-sdk";

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

export const uploadImage = (req: Request, res: Response) => {
  const params = {
    ACL: "public-read",
    Bucket: process.env.BUCKET_NAME ?? "",
    Body: fs.createReadStream(req.file.path),
    ContentType: req.file.mimetype,
    Key: `gallery-test/${req.file.filename}`,
  };
  s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
    if (err) {
      console.log("err", err);
      res.send(err);
    }
    console.log("data", data);
    res.send(data.Location);
  });
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
