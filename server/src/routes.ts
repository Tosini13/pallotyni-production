import express from "express";
import {
  createParagraph,
  deleteParagraph,
  getParagraph,
  updateParagraph,
} from "./controllers/paragraph";
import {
  createConfession,
  deleteConfession,
  getConfession,
  updateConfession,
} from "./controllers/confession";
import {
  createService,
  deleteService,
  getService,
  updateService,
} from "./controllers/service";
import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "./controllers/news";
import {
  deleteImage,
  multerConfig,
  updateImage,
  uploadImage,
  uploadImages,
} from "./controllers/images";
import {
  createPhotograph,
  createPhotographAddToAlbum,
  deletePhotograph,
  getAllPhotographs,
  getPhotographs,
  updatePhotograph,
} from "./controllers/photograph";
import {
  createAlbum,
  createManyPhotographsAndAddToAlbum,
  deleteAlbum,
  getAlbums,
  updateAlbum,
} from "./controllers/album";

const router = express.Router();

// -----------------------------------------
// PARAGRAPHS
router.get("/paragraphs", getParagraph);
router.post("/paragraphs", createParagraph);
router.put("/paragraphs/:id", updateParagraph);
router.delete("/paragraphs/:id", deleteParagraph);

// -----------------------------------------
// SERVICES
router.get("/services", getService);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// -----------------------------------------
// CONFESSIONS
router.get("/confessions", getConfession);
router.post("/confessions", createConfession);
router.put("/confessions/:id", updateConfession);
router.delete("/confessions/:id", deleteConfession);

// -----------------------------------------
// NEWS
router.get("/news", getAllNews);
router.post("/news", createNews);
router.put("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

// -----------------------------------------
// PHOTOGRAPHS

router.get("/photographs", getAllPhotographs);
router.get("/albums/:albumId/photographs", getPhotographs);
router.post("/photographs", createPhotograph);
router.post("/photographs/:albumId", createPhotographAddToAlbum);
router.put("/photographs/:id", updatePhotograph);
router.delete("/albums/:albumId/photographs/:photographId", deletePhotograph);

// -----------------------------------------
// ALBUM
router.get("/albums", getAlbums);
router.post("/albums", createAlbum);
router.put("/albums/:id", updateAlbum);
router.put("/albumsAddManyPhotos/:id", createManyPhotographsAndAddToAlbum);
router.delete("/albums/:id", deleteAlbum);

// -----------------------------------------
// IMAGES
router.post("/many-images", multerConfig.array("images"), uploadImages);
router.post("/images", multerConfig.single("img"), uploadImage);
router.put("/images/:path", multerConfig.single("img"), updateImage);
router.delete("/images/:path", deleteImage);

export default router;
