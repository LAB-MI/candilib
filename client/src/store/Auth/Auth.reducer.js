import {
  CHECK_ADMIN_TOKEN,
  CHECK_TOKEN,
  FETCH_TOKEN,
  RESET_AUTH_ERROR,
  SET_AUTH_ERROR,
  SET_TOKEN,
  SET_AUTHENTICATION,
  RESET_TOKEN,
} from './Auth.actions';

const defaultState = {
  isLoggingIn: false,
  isGettingToken: false,
  isAuthenticated: false,
  isCheckingToken: false,
};

export default (state = defaultState, action = { type: '' }) => {
  switch (action.type) {
    case CHECK_ADMIN_TOKEN:
      return {
        ...state,
        isGettingToken: true
      };
    case CHECK_TOKEN:
      return {
        ...state,
        isCheckingToken: true
      };
    case FETCH_TOKEN:
      return {
        ...state,
        signInError: undefined,
        isLoggingIn: false,
        isGettingToken: true,
      };
      case RESET_TOKEN:
      return {
        ...defaultState,
        isAuthenticated: false,
      };
    case SET_AUTHENTICATION:
    case SET_TOKEN:
      return {
        ...state,
        isGettingToken: false,
        isAuthenticated: true,
        isCheckingToken: false,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        signInError: action.payload.errorMessage,
        isCheckingToken: false,
      }
    case RESET_AUTH_ERROR:
      return {
        ...state,
        signInError: undefined,
      }
    default:
      return state;
  }
};
