import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { TYPE } from '../types';

// 🌈🌈🌈 방문자수 🌈🌈🌈
const loadVisitorAPI = (payload) => {
    return axios.get(`/api/visitor/visit`);
};

function* loadVisitor(action) {
    try {
        const result = yield call(loadVisitorAPI, action.payload);
        console.log('success!');
        yield put({
            type: TYPE.VIEWS_CHECK_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TYPE.VIEWS_CHECK_FAILURE,
            payload: e,
        });
    }
}

function* watchLoadVisitor() {
    yield takeEvery(TYPE.VIEWS_CHECK_REQUEST, loadVisitor);
}

export default function* visitorSaga() {
    yield all([fork(watchLoadVisitor)]);
}
