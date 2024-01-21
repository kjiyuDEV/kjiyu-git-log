import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPen, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../redux/types';
import toast from 'react-hot-toast';

const Post = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const [liked, setLiked] = useState(false);
    const { auth, data } = useSelector((state) => {
        console.log(state);
        return {
            confirmModal: state.modals.confirmModal,
            auth: state.auth,
            data: state.post.postDetail,
        };
    });
    console.log(history);
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
    }, []);

    return (
        <>
            <div className="post-wrap">
                <div className="title-wrap">
                    <p className="category">{data?.category?.categoryName || '일상'}</p>
                    <p className="title">{data.title}</p>
                    <p className="date">{data.date}</p>

                    {auth?.user?.role === 'MainMaster' && (
                        <div className="edit-icon-wrapper">
                            <FontAwesomeIcon
                                icon={faPen}
                                className="svg"
                                onClick={() => history.push(`/posting/edit/${params.id}`)}
                            />
                            <FontAwesomeIcon className="svg" icon={faTrash} onClick={handleModal} />
                        </div>
                    )}
                </div>
                <div className="contents">
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
                    {/* <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div> */}
                </div>
            </div>
            <div className="post-footer">
                <div className="left-wrap">
                    <div className="likes" onClick={() => setLiked(!liked)}>
                        {/* <FontAwesomeIcon icon={faHeart} fontSize={'25px'} /> */}
                        <FontAwesomeIcon
                            icon={liked ? faHeartFill : faHeart}
                            fontSize={'25px'}
                            color="rgb(237, 64, 107)"
                        />
                        <p>{2}</p>
                    </div>
                    <div className="comments">
                        <FontAwesomeIcon icon={faComment} fontSize={'25px'} />
                    </div>
                </div>
                <div className="share">
                    <FontAwesomeIcon icon={faShare} fontSize={'25px'} />
                </div>
            </div>
        </>
    );
};

export default withRouter(Post);
