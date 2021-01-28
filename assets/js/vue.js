import Vue from 'vue';
import VueRouter from 'vue-router';
import VuePageTitle from 'vue-page-title';
import VueParticles from 'vue-particles';
import VueCookies from 'vue-cookies';
import {routes} from './routes';
import App from '../vue/App.vue';

const router = new VueRouter({
	routes,
	linkExactActiveClass: 'active',
});

Vue.use(VueRouter);
Vue.use(VuePageTitle, {
	router,
	suffix: '| ZukyDesigns '
});
Vue.use(VueCookies);
Vue.use(VueParticles);

Vue.$cookies.config(Infinity,'','',false);

new Vue({
  	el: '#app',
  	router,
  	render: h => h(App)
});