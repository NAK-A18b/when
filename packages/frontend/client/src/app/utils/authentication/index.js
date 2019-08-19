import { AUTH_TOKEN } from '../../constants';

export const authToken = () => localStorage.getItem(AUTH_TOKEN);