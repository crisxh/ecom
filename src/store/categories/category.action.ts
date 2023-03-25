import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE, Category } from "./category.types";


// three action types category reducer accepts:
export type FetchCategoriesStart = 
  Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>

export type FetchCategoriesSucess = 
  ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = 
ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
Error>

// union
export type CategoryAction = 
  | FetchCategoriesStart
  | FetchCategoriesSucess
  | FetchCategoriesFailed;



export const fetchCategoriesStart = (): FetchCategoriesStart => 
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSucess = (categoriesArray: Category[]): FetchCategoriesSucess =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error: Error) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);