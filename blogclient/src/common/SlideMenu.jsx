import React, { useState } from 'react';
import { faRightFromBracket, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TYPE } from '../redux/types';

const SlideMenu = ({ hideMenu, setHideMenu }) => {
    const dispatch = useDispatch();
    const [menuClose, setMenuClose] = useState(false);
    const { modal, auth } = useSelector((state) => {
        return {
            modal: state.modals.modal,
            auth: state.auth,
        };
    });
    // 메뉴 닫을 때 부드럽게 닫히기 위한 fn
    const handleClose = () => {
        setMenuClose(true);
        setTimeout(() => {
            setHideMenu(!hideMenu);
        }, 800);
    };

    const handleModalOpen = () => {
        console.log('acitve');
        if (!auth.token) {
            dispatch({
                type: TYPE.OPEN_MODAL,
                data: {
                    type: 'login',
                    title: '아이디와 비밀번호를 입력해주세요',
                },
            });
        } else {
            dispatch({
                type: TYPE.OPEN_CONFIRM_MODAL,
                data: {
                    type: 'logout',
                    title: '로그아웃 하시겠습니까?',
                    handleConfirm: () => {
                        dispatch({
                            type: TYPE.LOGOUT_REQUEST,
                        });
                        dispatch({
                            type: TYPE.CLOSE_CONFIRM_MODAL,
                        });
                        dispatch({
                            type: TYPE.CLOSE_MODAL,
                        });
                    },
                },
            });
        }
    };
    return (
        <div className={`slide-menu ${menuClose ? 'inactive' : !hideMenu ? 'active' : ''}`}>
            <div className="header-wrapper">
                {!auth.token && (
                    <div className="user-info not-user">
                        <p onClick={() => handleModalOpen()}>로그인이 필요합니다</p>
                    </div>
                )}
                {auth.token && (
                    <div className="user-info user">
                        <p>
                            {auth.user.userId} ({auth.user.nickname})
                        </p>
                    </div>
                )}
                <button onClick={() => handleClose()} className="close-btn">
                    <FontAwesomeIcon icon={faXmark} fontSize="30px" color="black" />
                </button>
            </div>
            <div className={`edit-wrapper ${auth.token ? 'user' : 'not-user'}`}>
                {auth.token ? (
                    <>
                        <div className="edit-user">
                            <div className="icon">
                                <FontAwesomeIcon className="svg" icon={faUserPen} fontSize={'20px'} />
                            </div>
                            <p className="p">회원정보 수정</p>
                        </div>
                        <div className="logout-user" onClick={() => handleModalOpen()}>
                            <div className="icon">
                                <FontAwesomeIcon className="svg" icon={faRightFromBracket} fontSize={'20px'} />
                            </div>
                            <p className="p">로그아웃</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="p">회원가입을 하시면 다양한 권한이 주어져요.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SlideMenu;
