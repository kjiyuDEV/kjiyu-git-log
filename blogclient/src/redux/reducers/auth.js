import localStorage from 'redux-persist/es/storage';
import { TYPE } from '../types';
import toast from 'react-hot-toast';

const initialState = {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: '',
    userId: '',
    name: '',
    nickname: '',
    role: '',
    errorMsg: '',
    successMsg: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.LOGOUT_REQUEST:
        case TYPE.LOGIN_REQUEST:
            return Object.assign({}, state, {
                ...state,
                errorMsg: '',
                isLoading: true,
            });

        case TYPE.LOGIN_SUCCESS:
        case TYPE.USER_REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            toast(`안녕하세요 ${action.payload.user.nickname}`);
            return Object.assign({}, state, {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: true,
                userId: action.payload.user.id,
                role: action.payload.user.role,
                errorMsg: '',
            });

        case TYPE.LOGOUT_SUCCESS:
            toast('로그아웃 했습니다');
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                role: null,
                errorMsg: '',
            });

        case TYPE.LOGOUT_FAILURE:
        case TYPE.LOGIN_FAILURE:
        case TYPE.USER_REGISTER_FAILURE:
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                role: null,
                // errorMsg: action.payload.data.msg,
                errorMsg: action.payload.data.msg,
            });

        case TYPE.CLEAR_ERROR_REQUEST:
            // localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, {
                ...state,
                errorMsg: null,
            });
        case TYPE.CLEAR_ERROR_SUCCESS:
            // localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, {
                ...state,
                errorMsg: null,
            });
        case TYPE.CLEAR_ERROR_FAILURE:
            // localStorage.setItem('token', action.payload.token);
            return Object.assign({}, state, {
                ...state,
                errorMsg: null,
            });

        default:
            return state;
    }
};
