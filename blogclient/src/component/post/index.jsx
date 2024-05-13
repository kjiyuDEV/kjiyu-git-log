import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPen, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../redux/types';
import toast from 'react-hot-toast';
import SlideUp from './slideUp/CommnetSlideUp';

const Post = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const { auth, data, slideUp, comment } = useSelector((state) => {
        console.log(state);
        return {
            confirmModal: state.modals.confirmModal,
            auth: state.auth,
            data: state.post,
            slideUp: state.modals.slideUp,
            comment: state.comment,
        };
    });
    const [liked, setLiked] = useState(false);
    console.log(data, 'data');
    console.log(auth, '<auth');

    const handleModal = () => {
        const token = localStorage.getItem('token');
        dispatch({
            type: TYPE.OPEN_CONFIRM_MODAL,
            data: {
                type: 'delete',
                title: '해당 게시글을 삭제 하시겠습니까?',
                handleConfirm: () => {
                    dispatch({ type: TYPE.POST_DELETE_REQUEST, payload: { id: params.id, token } });
                    toast('게시글을 삭제 했습니다');
                    history.push('/');
                },
            },
        });
    };

    const handleLikes = () => {
        if (!auth.token) {
            toast('로그인 후 이용할 수 있어요');
            dispatch({
                type: TYPE.OPEN_MODAL,
                data: {
                    type: 'login',
                    title: '아이디와 비밀번호를 입력해주세요',
                },
            });
            return;
        }
        const token = localStorage.getItem('token');
        console.log({ id: params.id, userId: auth.userId, token });
        dispatch({
            type: TYPE.POST_LIKE_REQUEST,
            payload: { id: params.id, userId: auth.userId, token },
        });
    };

    const handleComments = () => {
        dispatch({
            type: TYPE.OPEN_SLIDEUP,
        });
    };

    useEffect(() => {
        return () => {
            if (!history.location.pathname.includes('edit')) {
                console.log('reset!');
                dispatch({ type: TYPE.POST_DETAIL_RESET });
            }
        };
    }, []);

    useEffect(() => {
        dispatch({ type: TYPE.POST_DETAIL_LOADING_REQUEST, payload: params.id });
    }, [comment]);

    useEffect(() => {
        setLiked(data?.postDetail.likes?.includes(auth.userId));
    }, [data?.postDetail?.likes]);

    useEffect(() => {
        data?.contents?.replaceAll('<img', '<img class="img"');
        data?.contents?.replaceAll('<code', '<code class="code"');
    }, [data?.contents]);

    useEffect(() => {
        if (data.loading) {
            dispatch({ type: 'START_LOADING' });
        } else {
            dispatch({ type: 'STOP_LOADING' });
        }
    }, [data.loading]);

    console.log(data?.contents?.replaceAll('<img', '<img class="img"'));

    return (
        <>
            <div className="post-wrap">
                <div className="title-wrap">
                    <p className="category">{data?.postDetail?.category?.categoryName}</p>
                    <p className="title">{data?.postDetail.title}</p>
                    <p className="date">{data?.postDetail.date}</p>

                    {auth?.user?.role === 'MainMaster' && (
                        <div className="edit-icon-wrapper">
                            <FontAwesomeIcon icon={faPen} className="svg" onClick={() => history.push(`/posting/edit/${params.id}`)} />
                            <FontAwesomeIcon className="svg" icon={faTrash} onClick={handleModal} />
                        </div>
                    )}
                </div>
                <div className="contents">
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{
                            __html: data?.postDetail.contents
                                ?.replaceAll('<img', '<img class="img"')
                                ?.replaceAll('<p><code', '<p class="code-wrap"><code class="code"')
                                ?.replaceAll('<pre', '<pre class="code-block"'),
                        }}
                    ></div>
                    {/* <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div> */}
                </div>
            </div>
            <div className="post-footer">
                <div className="left-wrap">
                    <div className="likes" onClick={handleLikes}>
                        {/* <FontAwesomeIcon icon={faHeart} fontSize={'25px'} /> */}
                        <FontAwesomeIcon icon={liked ? faHeartFill : faHeart} fontSize={'25px'} color="rgb(237, 64, 107)" />
                        <p className="likes-count">{data?.postDetail?.likesCount}</p>
                    </div>
                    <div className="comments" onClick={handleComments}>
                        <FontAwesomeIcon icon={faComment} fontSize={'25px'} />
                        <p className="likes-count">{data?.postDetail?.comments?.length}</p>
                    </div>
                </div>
                <div
                    className="share"
                    onClick={() => {
                        toast('해당 게시글의 링크가 복사되었어요');
                        navigator.clipboard.writeText(window.location.href);
                    }}
                >
                    <FontAwesomeIcon icon={faShare} fontSize={'25px'} />
                </div>
            </div>

            {slideUp.open && <SlideUp />}
        </>
    );
};

export default withRouter(Post);
