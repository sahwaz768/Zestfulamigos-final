import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { rootReducer } from './root.reducer';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

// Helper function to create store
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true
  });

export const makeStore = () => {
  // Check if we're in a browser (client-side) or on the server (SSR)
  const isServer = typeof window === 'undefined';

  // On the server, do not use persistence (no localStorage or sessionStorage)
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // Client-side: Set up redux-persist for persistent state (localStorage)
    const persistConfig = {
      key: 'nextjs', // Key to use for persistence
      whitelist: ['app'], // Only persist the 'app' slice of the state (can change based on your needs)
      storage, // Storage is set to `localStorage` (client-side)
    };

    // Wrap the rootReducer with persistReducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // Create store with the persisted reducer
    const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production',
    });

    // Create the persistor to control the persistence lifecycle
    store.__persistor = persistStore(store);

    return store;
  }
};

// Create wrapper for Next.js
export const wrapper = createWrapper(makeStore);

// Redux hooks
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
