import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export const fetchCategoriesStarted = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_IN_PROGRESS);

export const fetchCategoriesCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesCategoriesError = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStarted());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesCategoriesError(error));
  }
};
