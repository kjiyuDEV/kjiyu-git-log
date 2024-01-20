import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE } from '../../redux/types';
import { faUser as faUserWhite } from '@fortawesome/free-regular-svg-icons';
import { faPen, faShare, faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const Main = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { posts, postCount } = useSelector((state) => state.post);
    const { auth } = useSelector((state) => {
        return {
            auth: state.auth,
        };
    });

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

    const initFetch = () => {
        dispatch({ type: TYPE.POSTS_LOADING_REQUEST, payload: 0 });
    };

    useEffect(() => {
        initFetch();
    }, []);

    console.log(document.getElementsByTagName('figure'));
    return (
        <>
            <div className="banner">
                <div className="visitor">
                    <p>total 방문자 수</p>
                    <p>1,234</p>
                </div>
                <div className="comment">
                    <p>반갑습니다! 그냥 이것저것 기록용.</p>
                    <p>개발일지 및 일상을 주로 기록하려함.</p>
                    <p>* 회원 권한 승인 이후 comment 및 likes 가능</p>
                    <p>* This site developed by kjiyu 2024</p>
                </div>
                <div className="icon_wrap">
                    {auth.user && auth?.userRole !== 'User' && (
                        <div className="login" onClick={() => history.push('/posting')}>
                            <div>
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                        </div>
                    )}
                    <div className="login" onClick={handleModalOpen}>
                        <div>
                            <FontAwesomeIcon icon={auth.token ? faUser : faUserWhite} />
                            {/* <FontAwesomeIcon icon={faUser} /> */}
                        </div>
                    </div>
                    <div className="share">
                        <div>
                            <FontAwesomeIcon icon={faShare} />
                        </div>
                    </div>
                </div>
            </div>
            <ol className="main-posts">
                <p style={{ marginLeft: '10px' }}>총 {postCount}개의 글</p>
                {posts.map((v) => {
                    return (
                        <li key={v.id} className="post-card" onClick={() => history.push(`/post/${v._id}`)}>
                            <div>
                                <div className="post-title">
                                    <span className="date">
                                        {v.date.split(' ')[0]}
                                        <span className="time">{v.date.split(' ')[1]}</span>
                                    </span>
                                    <span className="title">{v.title}</span>
                                </div>
                                {v.fileUrl !== 'http://localhost:7000' && (
                                    <div className="post-image">
                                        <img className="post-main-image" src={`${v.fileUrl}`} />
                                    </div>
                                )}

                                <div className="content">{v.previewContents}</div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </>
    );
};

export default withRouter(Main);
