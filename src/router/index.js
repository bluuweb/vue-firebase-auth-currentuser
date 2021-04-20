import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {firebase} from '../firebase'
// import {useAuth} from '@vueuse/firebase'


// const usarAutenticacion = (to, from, next) => {
//   const {isAuthenticated} = useAuth()
//   if(isAuthenticated.value){
//     next()
//   }else {
//     next('/')
//   }
// }

// const usarSinAutenticacion = (to, from, next) => {
//   const {isAuthenticated} = useAuth()
//   if(isAuthenticated.value){
//     next('/perfil')
//   }else { 
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "perfil" */ '../views/Perfil.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async(to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()){
    next('/');
  }else{
    next();
  }
});


export default router
