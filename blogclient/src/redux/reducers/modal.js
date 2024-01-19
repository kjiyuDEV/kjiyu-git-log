const initialState = {
    modal: {
        open: false,
        data: {
            type: '',
            title: '',
            description: '',
        },
    },
    confirmModal: {
        open: false,
        data: {
            type: '',
            title: '',
            description: '',
            txtCancel: '아니오',
            txtConfirm: '예',
        },
    },
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return Object.assign({}, state, {
                ...state,
                modal: {
                    open: true,
                    data: action.data,
                },
            });
        case 'CLOSE_MODAL':
            return Object.assign({}, state, {
                ...state,
                modal: {
                    ...initialState.modal,
                },
            });
        case 'OPEN_CONFIRM_MODAL':
            return Object.assign({}, state, {
                ...state,
                confirmModal: {
                    open: true,
                    data: { ...initialState.confirmModal.data, ...action.data },
                },
            });
        case 'CLOSE_CONFIRM_MODAL':
            return Object.assign({}, state, {
                ...state,
                confirmModal: {
                    ...initialState.confirmModal,
                },
            });
        default:
            return state;
    }
};
