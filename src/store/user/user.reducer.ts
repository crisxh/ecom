import { AnyAction } from 'redux';
import { UserData } from "../../utils/firebase/firebase.utils";
import { 
  signInSuccess, 
  signOutSuccess, 
  signUpFailed, 
  signOutFailed, 
  signInFailed 
} from "./user.action";


export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (
  state = INITIAL_STATE, 
  action: AnyAction
): UserState => {
    if (signInSuccess.match(action)) {
      return { 
        ...state, 
        currentUser: action.payload, 
        isLoading: false 
      };
    }

    if (signOutSuccess.match(action)) {
      return { 
        ...state, 
        currentUser: null, 
        isLoading: false
      };
    }

    if (
      signInFailed.match(action) ||
      signOutFailed.match(action) ||
      signUpFailed.match(action)
    ) {
      return { 
        ...state, 
        error: action.payload, 
        isLoading: false 
      };
    }

    return state;
};