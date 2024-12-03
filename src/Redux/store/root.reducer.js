import { combineReducers } from '@reduxjs/toolkit';
import companionFind from '../companionfindReducer/companionFinReducer';

export const rootReducer = {
    companionFind
};

// export type rootReducerType = ReturnType<typeof rootReducer>;