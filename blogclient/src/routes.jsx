import * as route from './route';

const routes = [
    {
        path: '/',
        component: route.Main,
    },
    {
        path: '/signUp',
        component: route.SignUp,
    },
    {
        path: '/posting',
        component: route.Posting,
    },
    {
        path: '/post/:id',
        component: route.Post,
    },
];

export default routes;
