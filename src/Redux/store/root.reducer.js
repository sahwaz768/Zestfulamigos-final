import { combineReducers } from '@reduxjs/toolkit';
import companionFind from '../companionfindReducer/companionFinReducer';
import AuthReducer from "../auth/auth.reducer";

export const rootReducer = {
    companionFind,
    AuthReducer
};

// export type rootReducerType = ReturnType<typeof rootReducer>;