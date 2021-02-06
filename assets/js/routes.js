import NotFound from '../vue/page/NotFound.vue';
import Home from '../vue/page/Home.vue';
import Portfolio from '../vue/page/Portfolio.vue';
import PortfolioItem from '../vue/page/PortfolioItem.vue';
import About from '../vue/page/About.vue';

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
        }
    },
    {
        path: '/portfolio',
        component: Portfolio,
        meta: {
        }
    },
    {
        path: '/portfolio/:id',
        component: PortfolioItem,
        meta: {
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
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