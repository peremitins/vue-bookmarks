import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import AddBookmark from '@/pages/AddBookmark';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/add-bookmark',
      name: 'AddBookmark',
      component: AddBookmark,
    },
  ],
  mode: 'history',
});
