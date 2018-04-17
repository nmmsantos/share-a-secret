import Vue from 'vue';
import Router from 'vue-router';
import Create from '@/views/Create.vue';
import Unlock from '@/views/Unlock.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'create',
      component: Create,
    },
    {
      path: '/unlock',
      name: 'unlock',
      component: Unlock,
    },
  ],
});

export default router;
