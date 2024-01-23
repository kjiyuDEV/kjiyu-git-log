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
    slideUp: {
        open: false,
        data: {
            type: '',
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
        case 'OPEN_SLIDEUP':
            return Object.assign({}, state, {
                ...state,
                slideUp: {
                    open: true,
                    data: action.data,
                },
            });
        case 'CLOSE_SLIDEUP':
            return Object.assign({}, state, {
                ...state,
                slideUp: {
                    ...initialState.modal,
                },
            });
        default:
            return state;
    }
};
