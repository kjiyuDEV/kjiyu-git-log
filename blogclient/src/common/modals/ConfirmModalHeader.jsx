import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE } from '../../redux/types';

const ConfirmModalHeader = () => {
    const dispatch = useDispatch();
    const { confirmModal } = useSelector((state) => {
        return {
            confirmModal: state.modals.confirmModal,
        };
    });

    const handleModalClose = () => {
        dispatch({
            type: TYPE.CLOSE_CONFIRM_MODAL,
        });
    };
    return (
        <>
            <div className="close_btn" onClick={handleModalClose}>
                <FontAwesomeIcon icon={faXmark} fontSize="20px" />
            </div>
            {/* <div className="title">{confirmModal.data.title}</div> */}
            <div className="title" dangerouslySetInnerHTML={{ __html: confirmModal.data.title }}></div>
        </>
    );
};

export default ConfirmModalHeader;
