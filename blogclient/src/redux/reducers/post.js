import { TYPE } from '../types';

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: '',
    postCount: '',
    loading: false,
    error: '',
    creatorId: '',
    categoryFindResult: '',
    title: '',
    searchBy: '',
    searchResult: '',
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.POSTS_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TYPE.POSTS_LOADING_SUCCESS:
            return {
                ...state,
                posts: [...action.payload.postsList],
                categoryFindResult: action.payload.categoryFindResult,
                postCount: action.payload.postCount,
                loading: false,
            };
        case TYPE.POSTS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case TYPE.POSTS_WRITE_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case TYPE.POSTS_WRITE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case TYPE.POSTS_WRITE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TYPE.POST_DETAIL_LOADING_REQUEST:
            return {
                ...state,
                // posts: [],
                loading: true,
            };
        case TYPE.POST_DETAIL_LOADING_SUCCESS:
            return {
                ...state,
                postDetail: action.payload,
                creatorId: action.payload.creator._id,
                title: action.payload.title,
                loading: false,
            };
        case TYPE.POST_DETAIL_RESET:
            return {
                ...state,
                postDetail: '',
                creatorId: '',
                title: '',
                loading: false,
            };
        case TYPE.POST_DETAIL_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TYPE.POST_EDIT_LOADING_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case TYPE.POST_EDIT_LOADING_SUCCESS:
            return {
                ...state,
                postDetail: action.payload,

                loading: false,
            };
        case TYPE.POST_EDIT_LOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TYPE.POST_EDIT_UPLOADING_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case TYPE.POST_EDIT_UPLOADING_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case TYPE.POST_EDIT_UPLOADING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TYPE.CATEGORY_FIND_REQUEST:
            return {
                ...state,
                posts: [],
                loading: true,
            };
        case TYPE.CATEGORY_FIND_SUCCESS:
            return {
                ...state,
                categoryFindResult: action.payload,
                loading: false,
            };
        case TYPE.CATEGORY_FIND_FAILURE:
            return {
                ...state,
                categoryFindResult: action.payload,
                loading: false,
            };
        case TYPE.SEARCH_REQUEST:
            return {
                ...state,
                posts: [],
                searchBy: action.payload,
                loading: true,
            };
        case TYPE.SEARCH_SUCCESS:
            return {
                ...state,
                searchBy: action.payload,
                searchResult: action.payload,
                loading: false,
            };
        case TYPE.SEARCH_FAILURE:
            return {
                ...state,
                searchResult: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
