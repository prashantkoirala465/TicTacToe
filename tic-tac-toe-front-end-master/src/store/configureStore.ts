// Import necessary functions and modules.
import { createReducer } from './reducers';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

// Function to configure the Redux store for the app.
export function configureAppStore() {
    // Create Saga middleware instance.
    const sagaMiddleware = createSagaMiddleware({});

    // Extract runSaga from sagaMiddleware.
    const { run: runSaga } = sagaMiddleware;

    // Middleware configuration with Saga middleware.
    const middlewares = [sagaMiddleware];

    // Enhancers configuration with injectors.
    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    // Customize middleware with options.
    const customizedMiddleware = getDefaultMiddleware({
        serializableCheck: false,
    });

    // Configure and create the Redux store.
    const store = configureStore({
        reducer: createReducer(),
        middleware: [...customizedMiddleware, ...middlewares],
        devTools: process.env.NODE_ENV !== 'production',
        enhancers,
    });

    // Return the configured store.
    return store;
}
