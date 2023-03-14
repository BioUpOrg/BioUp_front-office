import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/auth/UserReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});