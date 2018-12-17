import {
  CHECK_ADMIN_TOKEN,
  CHECK_TOKEN,
  FETCH_ADMIN_TOKEN,
  RESET_AUTH_ERROR,
  SET_AUTH_ERROR,
  SET_ADMIN_TOKEN,
  SET_ADMIN_AUTHENTICATION,
  SET_TOKEN,
  RESET_ADMIN_TOKEN,
  RESET_TOKEN,
  SET_AUTHENTICATION,
} from './Auth.actions';

const defaultState = {
  isLoggingIn: false,
  isGettingToken: false,
  isAdminAuthenticated: false,
  isAuthenticated: false,
  isCheckingToken: false,
};

export default (state = defaultState, action = { type: '' }) => {
  switch (action.type) {
    case CHECK_TOKEN:
    case CHECK_ADMIN_TOKEN:
      return {
        ...state,
        isCheckingToken: true
      };
    case FETCH_ADMIN_TOKEN:
      return {
        ...state,
        signInError: undefined,
        isLoggingIn: false,
        isGettingToken: true,
      };
      case RESET_ADMIN_TOKEN:
      return {
        ...defaultState,
        isAuthenticated: state.isAuthenticated,
      };
      case RESET_TOKEN:
      return {
        ...defaultState,
        isAdminAuthenticated: state.isAdminAuthenticated,
      };
    case SET_ADMIN_AUTHENTICATION:
      return {
        ...state,
        isAdminAuthenticated: true,
      }
    case SET_AUTHENTICATION:
    case SET_TOKEN:
      return {
        ...state,
        isGettingToken: false,
        isAuthenticated: true,
      };
    case SET_ADMIN_TOKEN:
      return {
        ...state,
        isGettingToken: false,
        isAdminAuthenticated: true,
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
