import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SlideUp from '../../../common/slideUps/SlideUp';
import { TYPE } from '../../../redux/types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import toast from 'react-hot-toast';

const CommentSlideUp = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const params = useParams();
    const [input, setInput] = useState('');
    const { auth, comments, comment } = useSelector((state) => {
        return {
            confirmModal: state.modals.confirmModal,
            auth: state.auth,
            data: state.post.postDetail,
            comments: state.comment.comments,
            comment: state.comment,
        };
    });

    const handleInput = (e) => {
        let { value } = e.target;
        setInput(value);
    };

    const handleSubmit = () => {
        const param = {
            contents: input,
            userId: auth.user.id,
            userName: auth.user.nickname || auth.user.name,
            id: params.id,
        };
        dispatch({
            type: TYPE.COMMENT_UPLOADING_REQUEST,
            payload: param,
        });
        toast('댓글이 작성 되었어요');
        setInput('');
    };

    useEffect(() => {
        dispatch({
            type: TYPE.COMMENT_LOADING_REQUEST,
            payload: params.id,
        });
    }, []);

    useEffect(() => {
        if (comment.loading) {
            dispatch({ type: 'START_LOADING' });
        } else {
            dispatch({ type: 'STOP_LOADING' });
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [comment.loading]);

    const contents = () => {
        return (
            <>
                <div className="content" ref={ref}>
                    {comments.length > 0 &&
                        comments.map((v, i) => {
                            return (
                                <div className="comment-box">
                                    <p className="user-name">{v.creatorName}</p>
                                    <p className="comment">{v.contents}</p>
                                    <p className="date">{v.date}</p>
                                </div>
                            );
                        })}
                    <div></div>
                </div>
                <div className="input-wrapper">
                    <input
                        value={input}
                        className="input"
                        placeholder={`${auth.user ? '내용을 입력하세요' : '댓글을 작성하려면 로그인하세요'}`}
                        onChange={handleInput}
                    />
                    <button className="button" onClick={handleSubmit}>
                        등록
                    </button>
                </div>
            </>
        );
    };
    return <SlideUp contents={contents()} />;
};

export default CommentSlideUp;
