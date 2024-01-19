import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { TYPE } from '../types';
import { push } from 'connected-react-router';

// 🌈🌈🌈 포스트 조회 🌈🌈🌈
const loadPostAPI = (payload) => {
    return axios.get(`/api/post/skip/${payload}`);
};

function* loadPosts(action) {
    console.log('???');
    try {
        const result = yield call(loadPostAPI, action.payload);
        yield put({
            type: TYPE.POSTS_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TYPE.POSTS_LOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchLoadPosts() {
    yield takeEvery(TYPE.POSTS_LOADING_REQUEST, loadPosts);
}

// 🌈🌈🌈 포스트 업로드 🌈🌈🌈
const uploadPostAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = payload.token;
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
    try {
        console.log(action, 'uploadPost function');
        const result = yield call(uploadPostAPI, action.payload);
        console.log(result, 'uploadPostAPI, action.payload');
        yield put({
            type: TYPE.POST_UPLOADING_SUCCESS,
            payload: result.data,
        });
        yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: TYPE.POST_UPLOADING_FAILURE,
            payload: e,
        });
        // yield put(push('/'));
    }
}

function* watchUploadPosts() {
    yield takeEvery(TYPE.POST_UPLOADING_REQUEST, uploadPosts);
}

// 🌈🌈🌈 포스트 상세 조회 🌈🌈🌈
const loadPostDetailAPI = (payload) => {
    console.log(payload);
    return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
    try {
        console.log(action);
        const result = yield call(loadPostDetailAPI, action.payload);
        console.log(result, 'post_detail_saga_data');
        yield put({
            type: TYPE.POST_DETAIL_LOADING_SUCCESS,
            payload: result.data,
        });
        // const sagaMiddleware = createSagaMiddleware();
    } catch (e) {
        yield put({
            type: TYPE.POST_DETAIL_LOADING_FAILURE,
            payload: e,
        });
        // yield put(push('/'));
    }
}

function* watchLoadPostDetail() {
    yield takeEvery(TYPE.POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// 🌈🌈🌈 포스트 삭제 🌈🌈🌈
const DeletePostAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = payload.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
    try {
        const result = yield call(DeletePostAPI, action.payload);
        yield put({
            type: TYPE.POST_DELETE_SUCCESS,
            payload: result.data,
        });
        // yield put(push('/'));
    } catch (e) {
        yield put({
            type: TYPE.POST_DELETE_FAILURE,
            payload: e,
        });
    }
}

function* watchDeletePost() {
    yield takeEvery(TYPE.POST_DELETE_REQUEST, DeletePost);
}

// 🌈🌈🌈 포스트 수정 🌈🌈🌈
const PostEditLoadAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = payload.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* PostEditLoad(action) {
    try {
        const result = yield call(PostEditLoadAPI, action.payload);
        yield put({
            type: TYPE.POST_EDIT_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TYPE.POST_EDIT_LOADING_FAILURE,
            payload: e,
        });
        // yield put(push('/'));
    }
}

function* watchPostEditLoad() {
    yield takeEvery(TYPE.POST_EDIT_LOADING_REQUEST, PostEditLoad);
}

// 🌈🌈🌈 포스트 수정 반영 🌈🌈🌈
const PostEditUploadAPI = (payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const token = payload.token;

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
    try {
        const result = yield call(PostEditUploadAPI, action.payload);
        yield put({
            type: TYPE.POST_EDIT_UPLOADING_SUCCESS,
            payload: result.data,
        });
        // yield put(push(`/post/${result.data._id}`));
    } catch (e) {
        yield put({
            type: TYPE.POST_EDIT_UPLOADING_FAILURE,
            payload: e,
        });
    }
}

function* watchPostEditUpload() {
    yield takeEvery(TYPE.POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

// 🌈🌈🌈 카테고리 조회 🌈🌈🌈
const CategoryFindAPI = (payload) => {
    return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
    try {
        const result = yield call(CategoryFindAPI, action.payload);
        yield put({
            type: TYPE.CATEGORY_FIND_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: TYPE.CATEGORY_FIND_FAILURE,
            payload: e,
        });
    }
}

function* watchCategoryFind() {
    yield takeEvery(TYPE.CATEGORY_FIND_REQUEST, CategoryFind);
}

// 🌈🌈🌈 포스트 검색조회 🌈🌈🌈
const SearchResultAPI = (payload) => {
    return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
    try {
        const result = yield call(SearchResultAPI, action.payload);
        yield put({
            type: TYPE.SEARCH_SUCCESS,
            payload: result.data,
        });
        // yield put(push(`/search/${encodeURIComponent(action.payload)}`));
    } catch (e) {
        yield put({
            type: TYPE.SEARCH_FAILURE,
            payload: e,
        });
        // yield put(push('/'));
    }
}

function* watchSearchResult() {
    yield takeEvery(TYPE.SEARCH_REQUEST, SearchResult);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUploadPosts),
        fork(watchLoadPostDetail),
        fork(watchDeletePost),
        fork(watchPostEditLoad),
        fork(watchPostEditUpload),
        fork(watchCategoryFind),
        fork(watchSearchResult),
    ]);
}
