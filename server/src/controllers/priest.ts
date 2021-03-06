import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Priest, { IPriest, TPriestRes, TPriest } from "../models/priest";

export const convertPriest = (priest: LeanDocument<IPriest>): TPriestRes => ({
  id: priest._id,
  firstName: priest.firstName,
  lastName: priest.lastName,
  path: priest.path,
  position: priest.position,
  description: priest.description,
  isInFooter: priest.isInFooter,
});

export const getAllPriests = (req: Request, res: Response) => {
  Priest.find({})
    .then((items) => res.send(items.map((item) => convertPriest(item))))
    .catch((err) => console.log(err));
};

export const createPriest = (req: Request, res: Response) => {
  console.log("body", req.body);
  const priestData: TPriest = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    path: req.body.path,
    description: req.body.description,
    position: req.body.position,
    isInFooter: req.body.isInFooter,
  };
  Priest.create(priestData)
    .then((priest) => res.send(convertPriest(priest)))
    .catch((e) => console.log(e));
};

export const updatePriest = (req: Request, res: Response) => {
  const priestData: TPriest = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    path: req.body.path,
    position: req.body.position,
    description: req.body.description,
    isInFooter: req.body.isInFooter,
  };
  Priest.findByIdAndUpdate({ _id: req.params.id }, priestData)
    .then((p) => {
      Priest.findOne({ _id: req.params.id })
        .then((priest) => priest && res.send(convertPriest(priest)))
        .catch((err) => console.log(err));
    })
    .catch((e) => console.log(e));
};

export const deletePriest = (req: Request, res: Response) => {
  Priest.findByIdAndRemove({ _id: req.params.id })
    .then((priest) => priest && res.send(convertPriest(priest)))
    .catch((e) => console.log(e));
};
