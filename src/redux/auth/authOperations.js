import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSingOut, authStateChange, updateUserProfile } from "./authSlice";

export const authRegisterUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        try {
          await updateProfile(user, { displayName: name });
        } catch (error) {
          throw error;
        }
      }

      const { uid, displayName } = auth.currentUser;

      dispatch(updateUserProfile({ userId: uid, name: displayName }));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        name: user.displayName,
        userId: user.uid,
      };
      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export const authLogInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSingOut());
};
