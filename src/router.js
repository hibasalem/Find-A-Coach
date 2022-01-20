import { createRouter, createWebHistory } from 'vue-router';
import CoachesDeatail from './pages/coaches/CoachesDeatail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegestration from './pages/coaches/CoachRegestration.vue';
import ContactCoache from './pages/requests/ContactCoache.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesDeatail,
      props: true,
      children: [{ path: 'contact', component: ContactCoache }],
    },
    {
      path: '/regester',
      component: CoachRegestration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthinticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthinticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
