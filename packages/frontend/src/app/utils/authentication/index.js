import {
    AUTH_TOKEN
} from '../../constants';

export const token = () => localStorage.getItem(AUTH_TOKEN);