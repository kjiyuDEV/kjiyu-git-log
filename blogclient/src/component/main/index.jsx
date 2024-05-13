import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE } from '../../redux/types';
import { faUser as faUserWhite } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faMessage, faPen, faShare, faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Main = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const visitInit = JSON.parse(localStorage.getItem('visitInit'));

    const { auth, posts, post } = useSelector((state) => {
        console.log(state);
        return {
            auth: state.auth,
            posts: state.post.posts,
            post: state.post,
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

    const handleCategory = (e) => {
        const ctgrTxt = e.target.options[e.target.selectedIndex].text;
        if (ctgrTxt !== '전체글') {
            dispatch({ type: TYPE.CATEGORY_FIND_REQUEST, payload: ctgrTxt });
        } else {
            initFetch();
        }
    };

    useEffect(() => {
        initFetch();
    }, []);

    useEffect(() => {
        if (post.loading) {
            dispatch({ type: 'START_LOADING' });
        } else {
            dispatch({ type: 'STOP_LOADING' });
        }
    }, [post.loading]);

    useEffect(() => {
        if (!visitInit) {
            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
            const item = {
                exTime: expirationDate,
            };
            localStorage.setItem('visitInit', JSON.stringify(item));
            dispatch({ type: TYPE.VIEWS_CHECK_REQUEST });
        }
    }, [visitInit]);
    return (
        <>
            <div className="banner">
                <div className="visitor">
                    <p>total 방문자 수</p>
                    <p>{post?.visitor}</p>
                </div>
                <div className="comment">
                    <p>개발일지 및 일상을 주로 기록하는</p>
                    <p>토이프로젝트 겸 만든 블로그입니다</p>
                    <p>React/nodejs로 개발되었습니다</p>
                    <p>* This site developed by kjiyu 2024, React&Node.js</p>
                    <br />
                    <p>React/Redux/NextJs/Typescript/Nodejs/AWS</p>
                </div>
                <div className="icon_wrap">
                    {/* {auth.token && (
                        <div className="login" onClick={() => history.push('/guestBook')}>
                            <div>
                                <FontAwesomeIcon icon={faMessage} />
                            </div>
                        </div>
                    )} */}
                    {auth?.user?.role === 'MainMaster' && (
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
                    <div
                        className="share"
                        onClick={() => {
                            toast('블로그 주소를 복사했어요');
                            navigator.clipboard.writeText(window.location.href);
                        }}
                    >
                        <div>
                            <FontAwesomeIcon icon={faShare} />
                        </div>
                    </div>
                </div>
            </div>
            <ol className="main-posts">
                <div className="main-top">
                    <p className="post-count">총 {posts?.length}개의 글</p>
                    <div className="category">
                        <FontAwesomeIcon className="svg" icon={faChevronDown} />
                        <select className="select" onChange={handleCategory}>
                            <option>전체글</option>
                            <option name="일상">일상</option>
                            <option name="개발기록">개발기록</option>
                        </select>
                    </div>
                </div>
                {posts &&
                    posts?.map((v) => {
                        return (
                            <li key={v.id} className="post-card" onClick={() => history.push(`/post/${v._id}`)}>
                                <div className="post-card-wrap">
                                    <div className="post-title">
                                        <p className="date" style={{ display: 'flex' }}>
                                            {v.date.split(' ')[0]}
                                            <p className="time">{v.date.split(' ')[1]}</p>
                                        </p>
                                    </div>
                                    {v.fileUrl !== 'http://localhost:7000' && v.fileUrl !== 'https://kjiyulog.com' && (
                                        <div className="post-image">
                                            <img className="post-main-image" src={`${v.fileUrl}`} />
                                        </div>
                                    )}
                                    <div className="contents">
                                        <p className="title">{v.title}</p>
                                        <p className="content">{v.previewContents}</p>
                                    </div>
                                </div>
                                <div className="bottom-info">
                                    <div className="likes">
                                        {/* <FontAwesomeIcon icon={faHeart} fontSize={'25px'} /> */}
                                        <FontAwesomeIcon icon={true ? faHeartFill : faHeart} fontSize={'25px'} color="rgb(237, 64, 107)" />
                                        <p className="count">{v.likesCount}</p>
                                    </div>
                                    <div className="comments">
                                        {/* <FontAwesomeIcon icon={faHeart} fontSize={'25px'} /> */}
                                        <FontAwesomeIcon icon={faComment} fontSize={'25px'} />
                                        <p className="count">{v.comments?.length}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ol>
        </>
    );
};

export default withRouter(Main);
