import { createSelector } from "reselect";

const selectCategoriesSlice = (state) => state.categories;

const selectCategories = createSelector(
  selectCategoriesSlice,
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  selectCategories,
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  selectCategoriesSlice,
  (categoriesSlice) => categoriesSlice.isLoading
);
