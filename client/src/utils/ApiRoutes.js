export const HOST = "http://localhost:3009";

export const AUTH_ROUTE = `${HOST}/api/auth`;
export const MESSAGE_ROUTE = `${HOST}/api/message`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBAORD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
