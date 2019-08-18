import { AUTH_TOKEN, USER_ID } from '../../constants';

export const authToken = () => parseInt(localStorage.getItem(AUTH_TOKEN));
export const userId = () => localStorage.getItem(USER_ID);