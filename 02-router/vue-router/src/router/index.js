import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'
import SessionView from '../views/SessionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Como hacemos redirecciones
    {
      path:'/home', redirect: '/'
    },
    {
      path:'/casa', redirect: { name: 'home' }
    },
    // Como añadimos un alias    
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: ['/hogar']
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/chats',
      component: () => import('../views/ChatsView.vue'),
      // Rutas anidadas
      children: [
        // Ruta con parametros
        {
          path: ':chatId',
          component: () => import('../views/ChatView.vue')
        }
      ]
    },
    {
      path: '/session',
      name: 'session',
      component: SessionView,
      // Que sucede si en una ruta principal tenemos diferentes componentes
      // Esto se usaria si tenemos rutas muy complejas en las cuales necesitamos hijos dentro de los hijos https://router.vuejs.org/guide/essentials/named-views.html
      children:[
        {          
          path:'',
          name: 'auth',
          components: {
            default: LoginView,
            register: () => import('../views/RegisterView.vue')
          }
        },
      ]
    }    
  ]
})

export default router
