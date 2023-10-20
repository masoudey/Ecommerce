import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../common.types';

interface AuthState {
    userInfo: User | null;
}

const storedUserInfo = localStorage.getItem('userInfo');
export const parsedUserInfo = storedUserInfo
    ? JSON.parse(storedUserInfo)
    : null;

const initialState: AuthState = {
    userInfo: parsedUserInfo,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<User>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
export type AuthSlice = AuthState;
