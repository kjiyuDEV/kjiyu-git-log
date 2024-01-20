/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Header = ({ hideMenu, setHideMenu, scroll }) => {
    const history = useHistory();

    const [isSearch, setIsSearch] = useState(false);
    const [fixedHeader, setFixedHeader] = useState(false);

    console.log(history);

    console.log(window);

    useEffect(() => {
        const postId = history.location.pathname.substring('/post/'.length);
        setFixedHeader([`/signUp`, `/post/${postId}`].includes(history.location.pathname));
    }, [window.location.pathname]);
    console.log(fixedHeader, scroll);
    return (
        <div className={`header ${scroll || fixedHeader ? 'active' : 'inactive'}`}>
            {!isSearch ? (
                <p className="p" onClick={() => history.push('/')}>
                    kjiyu's git-log
                </p>
            ) : (
                <input className="input" type="text" name="title" placeholder={'제목 및 내용을 입력해서 검색'} />
            )}
            <div className="right-box">
                <div className="search" onClick={() => setIsSearch(!isSearch)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="menu">
                    <FontAwesomeIcon icon={faBars} onClick={() => setHideMenu(!hideMenu)} />
                </div>
            </div>
        </div>
    );
};

export default Header;
