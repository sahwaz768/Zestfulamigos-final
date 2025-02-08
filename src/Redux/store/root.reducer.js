import { combineReducers } from '@reduxjs/toolkit';
import companionFind from '../companionfindReducer/companionFinReducer';
import AuthReducer from '../auth/auth.reducer';
import notiReducer from '../notiReducer/notiReducer';

export const rootReducer = {
  companionFind,
  AuthReducer,
  notiReducer
};

// export type rootReducerType = ReturnType<typeof rootReducer>;
