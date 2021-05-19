import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import React from "react";
import { TFooterData } from "../models/Footer";
import { FOOTER_API_URL } from "../models/const";

class FooterStore {
  data: TFooterData;

  async fetch() {
    const data = await axios.get(FOOTER_API_URL);
    const fetchedData = data.data as TFooterData;
    if (fetchedData) {
      this.data = fetchedData;
    } else {
      console.log("error");
    }
  }

  async updateFooter(footerData: TFooterData) {
    const data = await axios.put(`${FOOTER_API_URL}`, footerData);
    const updatedData = data.data as TFooterData;
    if (updatedData) {
      this.data = updatedData;
    } else {
      console.log("error");
    }
  }

  constructor() {
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
    this.data = {
      address: "",
      mailbox: "",
      tel: "",
      fax: "",
      email: "",
      accountNumber: "",
      bankName: "",
      officialWebsite: "",
    };
  }
}

const footerStore = new FooterStore();
export const FooterStoreContext = React.createContext(footerStore);
export const FooterStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <FooterStoreContext.Provider value={footerStore}>
      {children}
    </FooterStoreContext.Provider>
  );
};
