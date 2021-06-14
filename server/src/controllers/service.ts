import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Service, { IService, TService, TServiceRes } from "../models/service";

const convertService = (service: LeanDocument<IService>): TServiceRes => {
  return {
    id: service._id,
    days: service.days?.length ? service.days : undefined,
    date: service.date ?? undefined,
    priest: service.priest,
    time: service.time,
    title: service.title,
    period: service.period,
  };
};

export const getService = (req: Request, res: Response) => {
  Service.find({})
    .lean()
    .then((services) =>
      res.send(services.map((service) => convertService(service)))
    )
    .catch((err) => console.log(err));
};

export const createService = (req: Request, res: Response) => {
  const service: TService = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    time: req.body.time,
    priest: req.body.priest,
    period: req.body.period,
  };
  Service.create(service)
    .then((newService) => {
      Service.findOne({ _id: newService._id })
        .lean()
        .then((s) => res.send(s && convertService(s)))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const updateService = (req: Request, res: Response) => {
  const service: TService = {
    title: req.body.title,
    date: req.body.date,
    days: req.body.days,
    time: req.body.time,
    priest: req.body.priest,
    period: req.body.period,
  };
  Service.findByIdAndUpdate({ _id: req.params.id }, service)
    .then((oldService) => {
      Service.findOne({ _id: req.params.id })
        .lean()
        .then((newService) =>
          res.send(newService && convertService(newService))
        )
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const deleteService = (req: Request, res: Response) => {
  Service.findByIdAndRemove({ _id: req.params.id })
    .then((s) => res.send(s && convertService(s)))
    .catch((err) => console.log(err));
};
