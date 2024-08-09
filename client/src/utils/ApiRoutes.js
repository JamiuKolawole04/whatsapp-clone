export const HOST = "http://localhost:3009";

export const AUTH_ROUTE = `${HOST}/api/auth`;
export const MESSAGE_ROUTE = `${HOST}/api/message`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBAORD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;
export const GET_CALL_TOKEN = `${AUTH_ROUTE}/generate-token`;

export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/message`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-message`;
export const ADD_AUDIO_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-audio-message`;
export const GET_INTIAL_CONTACTS_ROUTE = `${MESSAGE_ROUTE}/get-initial-contacts`;
