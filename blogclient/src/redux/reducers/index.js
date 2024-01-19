// store > modules > index

// rootReducer
// modules 내에서 정의한 모듈들을 합쳐주는 역할

import { combineReducers } from 'redux';
import user from './auth';
import modal from './modal';
import post from './post';

const reducer = (state, action) => {
    return combineReducers({
        // 정의한 리듀서 모듈들을 결합
        user,
        modal,
        post,
        // 리듀서 모듈(slice)을 추가할 때마다 combineReducers 함수의 인자로 전달되는 객체 내부에 추가해줘야함
    })(state, action);
};

export default reducer;
