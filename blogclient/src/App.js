import ReduxProvider from './provider';
import './assets/css/content.css';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useRef, useState } from 'react';
import Header from './common/Header';
import SlideMenu from './common/SlideMenu';
import LoginModal from './common/modals/LoginModal';
import ConfirmModal from './common/modals/ConfirmModal';
import { useSelector } from 'react-redux';

function App() {
    const ref = useRef();
    const [hideMenu, setHideMenu] = useState(true);

    if (process.env.NODE_ENV === 'production') {
        console = window.console || {};
        console.log = function no_console() {};
        console.warn = function no_console() {};
        console.error = function () {};
    }
    return (
        <ReduxProvider>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '12px',
                        background: 'rgba(0, 0, 0, 0.801)',
                        color: 'white',
                        height: '30px',
                        borderRadius: '20px',
                    },
                    duration: '300',
                }}
            />
            <div className="main-wrap">
                <div className="wrap" ref={ref}>
                    <BrowserRouter>
                        {!hideMenu && <SlideMenu hideMenu={hideMenu} setHideMenu={setHideMenu} />}
                        <Header wrapRef={ref} hideMenu={hideMenu} setHideMenu={setHideMenu} />
                        <Switch>
                            {routes.map((route, idx) => {
                                console.log(route);
                                return <Route exact path={`route-${idx}`} key={`route-${idx}`} {...route} />;
                            })}
                        </Switch>
                        <ConfirmModal />
                        <LoginModal />
                    </BrowserRouter>
                </div>
            </div>
        </ReduxProvider>
    );
}

export default App;
