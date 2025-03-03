import companionFind from '../companionfindReducer/companionFinReducer';
import AuthReducer from '../auth/auth.reducer';
import notiReducer from '../notiReducer/notiReducer';
import userNotifications from '../userNotifications/userNotificationReducer';
import chatrooms from '../chatroomReducer/chatroomReducer';

export const rootReducer = {
  companionFind,
  AuthReducer,
  notiReducer,
  userNotifications,
  chatrooms
};

// export type rootReducerType = ReturnType<typeof rootReducer>;
