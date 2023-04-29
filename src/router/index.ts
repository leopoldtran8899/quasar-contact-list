import { route } from 'quasar/wrappers';
import AuthService from 'src/services/AuthService';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  // TODO Fix token checking for routes when integrate with main system
  Router.beforeEach(async (to) => {
    const token = localStorage.getItem('userToken');
    if (!token && to.path != '/login') {
      return '/login';
    }
    if (token) {
      const { valid } = await AuthService.verify(JSON.parse(token));
      if (valid && to.path == '/login') {
        return '/';
      } else if (valid) {
      } else {
        localStorage.removeItem('userToken')
        return '/';
      }
    }
  });

  return Router;
});
