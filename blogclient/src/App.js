import ReduxProvider from './provider';
import './assets/css/content.css';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef, useState } from 'react';
import Header from './common/Header';
import SlideMenu from './common/SlideMenu';
import LoginModal from './common/modals/LoginModal';

function App() {
    const ref = useRef();
    const [hideMenu, setHideMenu] = useState(true);

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
                <BrowserRouter>
                    <div className="wrap" ref={ref}>
                        {!hideMenu && <SlideMenu hideMenu={hideMenu} setHideMenu={setHideMenu} />}
                        <Header wrapRef={ref} hideMenu={hideMenu} setHideMenu={setHideMenu} />
                        <Switch>
                            {routes.map((route, idx) => {
                                return <Route exact path={`route-${idx}`} key={`route-${idx}`} {...route} />;
                            })}
                        </Switch>
                        {/* <ConfirmModal /> */}
                        <LoginModal />
                    </div>
                </BrowserRouter>
            </div>
        </ReduxProvider>
    );
}

export default App;
