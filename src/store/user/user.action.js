import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*
  CHECK_USER_SESSION: "user/check_user_session",
  GOOGLE_SIGN_IN_START: "user/google_sign_in_start",
  EMAIL_SIGN_IN_START: "user/email_sign_in_start",
  USER_SIGN_IN_SUCCESS: "user/user_sign_in_success",
  USER_SIGN_IN_FAILES: "user/user_sign_in_failed",
 */

export const checkUserSession = (_) =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_IN_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_USER_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.USER_SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_OUT_FAILED, error);

export const signUpStart = (displayName, email, password) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_UP_START, {
    displayName,
    email,
    password,
  });

export const signUpSuccess = (user, additionaldetails) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_UP_SUCCESS, {
    user,
    additionaldetails,
  });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGN_UP_FAILED, error);
