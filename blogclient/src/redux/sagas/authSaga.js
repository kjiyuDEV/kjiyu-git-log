import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { TYPE } from '../types';

// export default function* rootSaga() {
//     yield all([]);
// } //여러값을 반환하게 하는 최신문법함수

// 🌈🌈🌈 login 🌈🌈🌈 //
const loginUserAPI = (loginData) => {
    console.log(loginData, ':loginData');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
    try {
        console.log('??동작??');
        const result = yield call(loginUserAPI, action.payload);
        console.log(result);
        yield put({
            type: TYPE.LOGIN_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        console.log(action.payload);
        console.log('??동작??');
        console.log(e);
        yield put({
            type: TYPE.LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

function* watchLoginUser() {
    // 감시시 작동하는 함수 loginUser
    yield takeEvery(TYPE.LOGIN_REQUEST, loginUser);
}

// 🌈🌈🌈 logout 🌈🌈🌈 //
function* logout(action) {
    try {
        yield put({
            type: TYPE.LOGOUT_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: TYPE.LOGOUT_FAILURE,
        });
        console.log(e);
    }
}

function* watchLogout() {
    // 감시시 작동하는 함수 logout
    yield takeEvery(TYPE.LOGOUT_REQUEST, logout);
}

// 🌈🌈🌈 signUp 🌈🌈🌈 //
const registerUserAPI = (req) => {
    console.log(req, 'req');
    return axios.post('api/user', req);
};

function* registerUser(action) {
    try {
        const result = yield call(registerUserAPI, action.payload);
        console.log(result, 'RegisterUser Data');
        yield put({
            type: TYPE.USER_REGISTER_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TYPE.USER_REGISTER_FAILURE,
            payload: e.response,
        });
    }
}

function* watchRegisterUser() {
    // 감시하는 함수, registerUser
    yield takeEvery(TYPE.USER_REGISTER_REQUEST, registerUser);
}

// ***********************
export default function* authSaga() {
    yield all([
        // fork: 콕 찍어서, 모두 내보낸당
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchRegisterUser),
    ]);
}
