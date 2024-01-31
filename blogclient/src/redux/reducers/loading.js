const initialState = {
    isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return Object.assign({}, state, {
                isLoading: true,
            });
        case 'STOP_LOADING':
            return Object.assign({}, state, {
                isLoading: false,
            });
        default:
            return state;
    }
};
