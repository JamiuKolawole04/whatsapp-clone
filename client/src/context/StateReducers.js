import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };

    case reducerCases.SET_ALL_CONTACT_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    default:
      return state;
  }
};
