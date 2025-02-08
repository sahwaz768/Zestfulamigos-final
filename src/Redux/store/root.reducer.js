import { combineReducers } from '@reduxjs/toolkit';
import companionFind from '../companionfindReducer/companionFinReducer';
import AuthReducer from '../auth/auth.reducer';
import notiReducer from '../notiReducer/notiReducer';
import  userNotifications from '../userNotifications/userNotificationReducer';

export const rootReducer = {
  companionFind,
  AuthReducer,
  notiReducer,
  userNotifications
};

// export type rootReducerType = ReturnType<typeof rootReducer>;
