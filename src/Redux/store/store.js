import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './root.reducer';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true
  });

export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return store;
  } else {
    const persistConfig = {
      key: 'nextjs',
      whitelist: ['app', 'companionFind'],
      storage
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);

// export type storeType = ReturnType<typeof store.getState>;
// export type storeDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export const { dispatch: appDispatch, getState: appState } = store;
