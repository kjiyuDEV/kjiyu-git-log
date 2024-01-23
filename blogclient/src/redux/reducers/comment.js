import { TYPE } from '../types';

const initialState = {
    comments: [],
    creatorId: '',
    loading: false,
    isAuthenticated: false,
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.COMMENT_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TYPE.COMMENT_LOADING_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                loading: false,
            };
        case TYPE.COMMENT_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case TYPE.COMMENT_UPLOADING_REQUEST:
            console.log('ggg');
            return {
                ...state,
                loading: true,
            };
        case TYPE.COMMENT_UPLOADING_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                isAuthenticated: true,
                loading: false,
            };
        case TYPE.COMMENT_UPLOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default commentReducer;
