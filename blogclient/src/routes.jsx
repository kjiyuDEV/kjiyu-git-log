import * as route from './route';

const routes = [
    {
        path: '/signUp',
        component: route.SignUp,
    },
    {
        path: ['/posting', '/posting/edit/:id'],
        component: route.Posting,
    },
    {
        path: '/post/:id',
        component: route.Post,
    },
    {
        path: '/',
        component: route.Main,
    },
];

export default routes;
