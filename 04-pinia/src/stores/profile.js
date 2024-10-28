import { defineStore } from 'pinia'
// Para crear un estado lo hacemos pasandole en la funcion el parametro de nombre del estado global
// y luego un objeto donde contendra los valores del estado
export default defineStore('profile', {
  //puede ser como en vuex
  /*state() {
    return {

    }
  }*/
  // o directamente meterelo en un arrow function
  state: () => ({
    id: 1,
    username: '',
    avatar: '/avatars/avatar.jpg',
    status: null
  })
})