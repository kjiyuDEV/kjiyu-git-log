import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TYPE } from '../../redux/types';

const SlideUp = ({ contents }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(true);
    const [close, setClose] = useState(false);
    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setActive(!active);
            dispatch({
                type: TYPE.CLOSE_SLIDEUP,
            });
        }, 400);
    };

    return (
        active && (
            <div className={`slideUp-wrapper`}>
                <div className={`slideUp ${close ? 'inactive' : 'active'}`}>
                    <div className="slideUp-header">
                        <div className="title">댓글</div>
                        <div className="close" onClick={handleClose} style={{ cursor: 'pointer' }}>
                            글보기
                        </div>
                    </div>
                    {contents}
                </div>
            </div>
        )
    );
};

export default SlideUp;
