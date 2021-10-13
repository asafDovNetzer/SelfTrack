import { LoginData, User } from "../../Types";
import * as firebase from "../../Firebase";
import * as actionTypes from "./ActionTypes";
import type { AppDispatch } from "../../index";

import {
  getAuth,
  signInWithPopup,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { setError } from "./ActionsIndex";

export const loginAsync = (data: LoginData) => {
  return (dispatch: AppDispatch) => {
    firebase.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // const user: User = userCredential.user;

        window.location.href = `/app`;
      })
      .catch((error) => {
        let errorMessage: string;

        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          errorMessage = `The password you entered is invalid, please try again or recover password`;
        } else if (error.code === `auth/too-many-requests`) {
          errorMessage = `Too many requests, the account is tempereraly locked, please try again later`;
        } else if (error.code === `auth/network-request-failed`) {
          errorMessage = `Network error, make sure you're connected to the internet`;
        } else {
          errorMessage = `The email address you entered isn't registered`;
        }
        dispatch(setError(errorMessage));
      });
  };
};

export const checkEmailVerification = () => {
  return (dispatch: AppDispatch) => {
    const auth = getAuth();
    console.log(auth.currentUser);
  };
};

export const updateUserName = (name: string) => {
  const auth = getAuth();
  updateProfile(auth.currentUser!, {
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

export const loginGoogle = () => {
  return (dispatch: AppDispatch) => {
    if (window.innerWidth > 500) {
      signInWithPopup(firebase.auth, firebase.googleProvider)
        .then((result) => {
          window.location.href = "/app";
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setError(
              `Network error, make sure you're connected to the internet`
            )
          );
        });
    }

    if (window.innerWidth <= 500) {
      signInWithRedirect(firebase.auth, firebase.googleProvider);

      getRedirectResult(firebase.auth)
        .then((result: any) => {
          const user: User = result.user;

          console.log(`redirected google`, user);
          if (user) {
            window.location.href = "/app";
          }
        })
        .catch((error) => {});
    }
  };
};

export const loginFacebook = () => {
  return (dispatch: AppDispatch) => {
    if (window.innerWidth > 500) {
      signInWithPopup(firebase.auth, firebase.facebookProvider)
        .then((result) => {
          // const user = result.user;
          // const credential = FacebookAuthProvider.credentialFromResult(result);
          // const accessToken = credential!.accessToken;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (window.innerWidth <= 500) {
      signInWithRedirect(firebase.auth, firebase.facebookProvider);
    }
  };
};

export const signupAsync = (data: LoginData) => {
  return (dispatch: AppDispatch) => {
    firebase.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user: User = userCredential.user;

        console.log(user, `signup`);
        // const user = userCredential.user;
        // window.location.href = `/app`;
        // dispatch(loginSuccess(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loginSuccess = (user: User) => {
  return {
    type: actionTypes.LOGIN,
    user: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const setUserName = (userName: string) => {
  return {
    type: actionTypes.SET_USER_NAME,
    userName: userName,
  };
};
