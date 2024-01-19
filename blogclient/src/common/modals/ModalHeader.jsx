import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE } from '../../redux/types';

const ModalHeader = () => {
    const dispatch = useDispatch();
    const { modal } = useSelector((state) => {
        return {
            modal: state.modals.modal,
        };
    });

    const handleModalClose = () => {
        dispatch({
            type: TYPE.CLOSE_MODAL,
        });
    };
    return (
        <>
            <div className="close_btn" onClick={handleModalClose}>
                <FontAwesomeIcon icon={faXmark} fontSize="20px" />
            </div>
            <div className="title">{modal.data.title}</div>
        </>
    );
};

export default ModalHeader;
