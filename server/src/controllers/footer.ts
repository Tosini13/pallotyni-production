import { format } from "date-fns";
import { Request, Response } from "express";
import { LeanDocument } from "mongoose";
import Footer, { TFooter } from "../models/footer";
import { DATE_TIME_FORMAT } from "../models/global";

export const getFooter = (req: Request, res: Response) => {
  Footer.find({})
    .then((items) => res.send(items[0]))
    .catch((err) => console.log(err));
};

export const updateFooter = async (req: Request, res: Response) => {
  const data: TFooter = {
    address: req.body.address,
    mailbox: req.body.mailbox,
    tel: req.body.tel,
    fax: req.body.fax,
    email: req.body.email,
    accountNumber: req.body.accountNumber,
    bankName: req.body.bankName,
    officialWebsite: req.body.officialWebsite,
  };

  const footers = await Footer.find({});
  if (!footers.length) {
    console.log("NO DATA!");
    Footer.create(data)
      .then((n) => res.send(n))
      .catch((e) => console.log(e));
  } else {
    console.log("footers", footers);
    Footer.findByIdAndUpdate({ _id: footers[0]._id }, data)
      .then((_oldData) => {
        console.log("_oldData", _oldData);
        Footer.findOne({ _id: footers[0]._id })
          .then((updatedData) => updatedData && res.send(updatedData))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }
};
