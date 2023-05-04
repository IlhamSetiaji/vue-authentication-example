import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import TeamsList from '../components/teams/TeamsList.vue'
import UsersList from '../components/users/UsersList.vue'
import TeamMembers from '../components/teams/TeamMembers.vue'
import LoginView from '../views/LoginView.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/teams'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresUnauth: true }
  },
  {
    path: '/teams',
    name: 'teams',
    component: TeamsList,
    children: [
      {
        path: '/teams/:teamId',
        component: TeamMembers,
        props: true
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: UsersList,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition){
    console.log(to, from, savedPosition);
    if(savedPosition){
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    }
  }
});

router.beforeEach(function(to, _, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/teams');
  } else {
    next();
  }
});

export default router
