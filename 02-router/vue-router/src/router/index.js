import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'
import SessionView from '../views/SessionView.vue'
import NotFoundView from '../views/404View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Para añadir una ruta de 404
    {
      path:'/404',
      component: NotFoundView
    },
    // Para agregar una ruta de 404 por default 
    // Para indicarle cualquier ruta que no sea los demas redirige a 404
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    },
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
      alias: ['/hogar'],
      // Para añadir nuevas funcionalidades con metadatos en este caso 
      //para que una ruta este protegida y requiera autenticacion
      meta: {
        // esta pagina no
        requiredAuth: false
      }
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
        },
        // Tambien se puede hacer llegar el mismo parametro mediante una prop en la ruta
        {
          // Como validamos la ruta para que cumpla con un cierto patron? para sino es el caso que cumpla entonces mandarle a una redireccion de 404 o lo que sea 
          // esto lo logramos definiendo una regexp dentro del parentesis
          //path: 'props/:chatId',
          // Para indicarle que solo acepta numeros como agregarle mas coincidencia a las rutas
          path: 'props/:chatId(\\d+)',
          component: () => import('../views/ChatPropsView.vue'),
          // Para habilitar las props
          // props: true
          // Para que sea un poco mas dinamico lo hariamos devolviendo un objeto con las props que estemos admitiendo
          /*props: {
            //Aqui podriamos introducir logica en JS
            chatId: '3'
          }*/
          // Para que sea aun mas dinamico podria devolver una funcion en la cual el parametro que le llega es la route
          props: (route) => {
            //Aqui podriamos introducir logica en JS
            return {
              chatId: route.params.chatId
            }
          }
        }
      ],
      // esta url si requiere
      meta: {
        requiredAuth: true,
        role: 'admin'
      }
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

// Para manejar las validaciones en las rutas con vue
router.beforeEach((to, from) => {
  //console.log({ to, from })

  // Si NO tenemos permiso
  //return false
  // Si tenemos permiso
  //return true

  // para validar con los metadatos
  /*if(to.meta?.requiredAuth) {
    console.log({requiredAuth:to.meta.requiredAuth, to:to.path})
    // suponemos que no esta logeado entonces redirige
    return '/session'
  }*/


  // Si quisieramos evitar que vaya a home y nos rediriga a about
  //if(to.path === '/') return '/about' o tambien de esta forma
  //if(to.path === '/') return { name: 'about' }
  return true
})

// para agregar rutas dinamicas osea rutas que nosotros queramos probar y que no esten definidas por defecto como las anteriores
// hacemos uso de las variables de entorno de vite y solo cuando sea en test las mostraremos para probar
const stage = import.meta.env.VITE_STAGE
// Como agregamos una ruta dinamica
if(stage === 'test') {
  router.addRoute({
    path: '/profile',
    component: () => import('../views/ProfileView.vue')
  })
}

export default router
