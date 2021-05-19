import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

const SFooter = new Schema({
  address: {
    type: String,
    required: false,
  },
  mailbox: {
    type: String,
    required: false,
  },
  tel: {
    type: String,
    required: false,
  },
  fax: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  accountNumber: {
    type: String,
    required: false,
  },
  bankName: {
    type: String,
    required: false,
  },
  officialWebsite: {
    type: String,
    required: false,
  },
});

export type TFooter = {
  address?: string;
  mailbox?: string;
  tel?: string;
  fax?: string;
  email?: string;
  accountNumber?: string;
  bankName?: string;
  officialWebsite?: string;
};

export type TFooterRes = TFooter & {
  id: string;
};

export interface IFooter extends Document {
  address?: string;
  mailbox?: string;
  tel?: string;
  fax?: string;
  email?: string;
  accountNumber?: string;
  bankName?: string;
  officialWebsite?: string;
}

const Footer = mongoose.model<IFooter>("footer", SFooter);

export default Footer;
