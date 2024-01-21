import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './redux/reducers/auth';
import { modalReducer } from './redux/reducers/modal';
import createSagaMiddleware from 'redux-saga'; // redux-saga를 생성하기 위한 라이브러리
import localStorage from 'redux-persist/es/storage';
import { postReducer } from './redux/reducers/post';
import rootSaga from './redux/sagas';

const authInfo = {
    key: 'authInfo',
    storage: localStorage,
};

const reducer = combineReducers({
    auth: authReducer,
    modals: modalReducer,
    post: postReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// config 작성
const persistConfig = {
    key: 'auth', // 로컬스토리지에 저장할 키값
    storage, // local 또는 세션스토리지
    whitelist: ['auth'], // 저장할 리듀서
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // 이부분 추가
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});
console.log(rootSaga, '<rootSaga');
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
