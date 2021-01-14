import NotFound from '../vue/page/NotFound.vue';
import Home from '../vue/page/Home.vue';
import Portfolio from '../vue/page/Portfolio.vue';
import About from '../vue/page/About.vue';

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            title: 'H'
        }
    },
    {
        path: '/portfolio',
        component: Portfolio,
        meta: {
            title: 'P'
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: 'A'
        }
    },
    {
        path: '/error',
        component: NotFound,
        meta: {
            title: '404'
        }
    },
    {
        path: '*',
        redirect: '/error'
    },
];