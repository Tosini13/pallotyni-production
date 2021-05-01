import firebase from "../config/firebase";
import { EUserAuth } from "../models/const";

export type SignInType = {
  email: string;
  password: string;
};

export type TResetPassword = {
  email: string;
};

export const resetPassword = async ({ email }: TResetPassword) => {
  const promise = await new Promise((resolve, rejected) => {
    const user = firebase?.auth().sendPasswordResetEmail(email);
    if (user) {
      resolve(EUserAuth.PASSWORD_RESET_SUCCESS);
    } else {
      resolve(EUserAuth.PASSWORD_RESET_ERROR);
    }
  });
  return promise;
};

export const checkIfLoggedIn = async () => {
  const promise = await new Promise((resolve, rejected) => {
    const user = firebase?.auth().currentUser;
    if (user) {
      console.log("user", true);
      resolve(EUserAuth.LOGGED_IN);
    } else {
      console.log("user", false);
      resolve(EUserAuth.LOGGED_OUT);
    }
  });
  return promise;
};

export const signIn = async ({ email, password }: SignInType) => {
  const promise = await new Promise((resolve, rejected) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        resolve(EUserAuth.LOGGED_IN);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          console.log("WRONG_PASSWORD");
          resolve(EUserAuth.WRONG_PASSWORD);
        } else {
          resolve(EUserAuth.LOGGED_OUT);
        }
      });
  });
  return promise;
};

export const signOut = async () => {
  const promise = await new Promise((resolve, rejected) => {
    const isSignedOut = firebase?.auth().signOut();
    console.log(isSignedOut);
    if (isSignedOut) {
      console.log("isSignedOut", true);
      resolve(EUserAuth.LOGGED_OUT);
    } else {
      console.log("isSignedOut", false);
      resolve(EUserAuth.LOGGED_IN);
    }
  });
  return promise;
};
