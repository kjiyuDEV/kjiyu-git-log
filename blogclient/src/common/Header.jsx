/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Header = ({ hideMenu, setHideMenu, wrapRef }) => {
    const params = useParams();
    const history = useHistory();
    const [scroll, setScroll] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [fixedHeader, setFixedHeader] = useState(false);

    const handleScroll = useCallback((e) => {
        if (wrapRef?.current?.scrollTop > 0) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }, []);

    console.log(history);

    useEffect(() => {
        if (wrapRef?.current) {
            wrapRef.current.addEventListener('scroll', handleScroll);
            // return () => wrapRef.current.removeEventListener('scroll', handleScroll);
        }
    }, [wrapRef?.current]);

    useEffect(() => {
        setFixedHeader([`/signUp`, `/post/${params.id}`].includes(history.location.pathname));
    }, [history.location.pathname]);
    return (
        <div className={`header ${scroll || fixedHeader ? 'active' : 'inactive'}`}>
            {!isSearch ? (
                <p onClick={() => history.push('/')}>kjiyu's git-log</p>
            ) : (
                <input type="text" name="title" placeholder={'제목 및 내용을 입력해서 검색'} />
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
