import { createRouter, createWebHistory } from 'vue-router';
import CoachesDeatail from './pages/coaches/CoachesDeatail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegestration from './pages/coaches/CoachRegestration.vue';
import ContactCoache from './pages/requests/ContactCoache.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

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
    { path: '/regester', component: CoachRegestration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
