import { action, makeObservable, observable } from "mobx";
import React from "react";
import {
  checkIfLoggedIn,
  signIn,
  signOut,
  resetPassword,
  SignInType,
  TResetPassword,
} from "../helpers/auth";
import { EUserAuth } from "../models/const";

type TauthFunc = {
  successCallBack?: () => void;
  failureCallBack?: () => void;
};

class Auth {
  isLoggedIn: boolean = false;

  async check() {
    const res = await checkIfLoggedIn();
    if (res === EUserAuth.LOGGED_IN) {
      this.isLoggedIn = true;
    }
    if (res === EUserAuth.LOGGED_OUT) {
      this.isLoggedIn = false;
    }
  }

  async logIn({ email, password, failureCallBack }: SignInType & TauthFunc) {
    const res = await signIn({ email, password });
    console.log("logIn", res);
    if (res === EUserAuth.LOGGED_IN) {
      this.isLoggedIn = true;
    }
    if (res === EUserAuth.LOGGED_OUT) {
      this.isLoggedIn = false;
    }
    if (res === EUserAuth.WRONG_PASSWORD) {
      if (failureCallBack) failureCallBack();
      this.isLoggedIn = false;
    }
  }

  async logOut({ successCallBack, failureCallBack }: TauthFunc) {
    const res = await signOut();
    console.log("logOut", res);
    if (res === EUserAuth.LOGGED_IN) {
      this.isLoggedIn = true;
      if (successCallBack) successCallBack();
    }
    if (res === EUserAuth.LOGGED_OUT) {
      this.isLoggedIn = false;
      if (failureCallBack) failureCallBack();
    }
  }

  async resetPassword({
    email,
    successCallBack,
    failureCallBack,
  }: TResetPassword & TauthFunc) {
    const res = await resetPassword({ email });
    console.log("resetPassword", res);
    if (res === EUserAuth.PASSWORD_RESET_SUCCESS) {
      if (successCallBack) successCallBack();
    }
    if (res === EUserAuth.PASSWORD_RESET_ERROR) {
      if (failureCallBack) failureCallBack();
    }
  }

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      check: action,
      logIn: action,
      logOut: action,
    });
    this.check();
  }
}

const authStore = new Auth();
export const AuthStoreContext = React.createContext(authStore);
export const AuthStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
};
