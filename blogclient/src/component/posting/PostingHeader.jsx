import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PostingHeader = ({ onSubmit }) => {
    const history = useHistory();
    return (
        <div className="posting-header">
            <div className="close-btn" onClick={() => history.go(-1)}>
                <FontAwesomeIcon icon={faXmark} fontSize="20px" />
            </div>
            <div className="submit-btn" onClick={onSubmit}>
                등록
            </div>
        </div>
    );
};

export default PostingHeader;
