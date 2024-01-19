import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { useParams, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../redux/types';

const Post = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [liked, setLiked] = useState(false);
    const data = useSelector((state) => state.post.postDetail);

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
                </div>
                <div className="contents">
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
                    <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>
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
