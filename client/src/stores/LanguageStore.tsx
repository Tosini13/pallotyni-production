import React from "react";
import { action, makeObservable, observable } from "mobx";

enum E_LANGUAGE {
  english = "en",
  polish = "pl",
}

export class LanguageStore {
  currentLanguage: E_LANGUAGE = E_LANGUAGE.polish;

  changeLanguage(lng: E_LANGUAGE) {
    this.currentLanguage = lng;
  }

  constructor() {
    makeObservable(this, {
      currentLanguage: observable,
      changeLanguage: action,
    });
  }
}

const lngStore = new LanguageStore();
export const LanguageContext = React.createContext(lngStore);
export const LanguageProvider: React.FC<{}> = ({ children }) => (
  <LanguageContext.Provider value={lngStore}>
    {children}
  </LanguageContext.Provider>
);
