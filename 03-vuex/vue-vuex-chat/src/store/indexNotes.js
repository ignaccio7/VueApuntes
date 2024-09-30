import { createStore } from 'vuex'
import profile from '@/store/modules/profile'
import channels from '@/store/modules/channels'
import messages from '@/store/modules/messages'
import contacts from '@/store/modules/contacts'
import { COMMIT_SET_STATUS, COMMIT_UPDATE_USERNAME } from '@/common/mutation-types.js'

// Como llamamos helpers
import { getUser } from '@/api/index.js'

const store = createStore({
  state() {
    return {
      status: null,
      username: 'ignaccio rojas'
    }
  },
  // Los getters son practicamente lo mismo que las funciones computadas en el options api y tambien seran reactivos
  getters: {
    // como 1er argumento siempre le llega el state
    //firstName(state) {
    //  return state.username.split('.')[0]
    //}
    // Si nosotros quisieramos enviar desde la vista algun parametro lo recibiriamos de esta forma
    //firstName: (state) => (separator) => {
    //  return state.username.split(' ').join(separator)
    //}
    // Para consumir el estado del modulo separado en profile
    firstName: (state, getters, rootState) => (separator) => {
      return rootState.profile.username.split(' ').join(separator)
    }
  },
  // las mutaciones siempre son funciones sincronas para modificar el estado
  mutations: {    
    // como primer parametro siempre recibe el estado y 2do opcional el payload
    // para contar con el autococompletado y haciendo uso de 
    //updateUsername(state, username) {
    [COMMIT_UPDATE_USERNAME](state, username) {
      state.username = username;
    }
    /*[COMMIT_SET_STATUS](state, value) {
      state.status = value
    }*/
  },
  // aqui es el lugar ideal para colocar la logica del negocio y si pueden ser funciones asincronas
  // Para ejecutar una action es dispatch - para el mutation es commit
  actions: {
    // 1er argumento el contexto al cual podremos ejecutar las mutaciones mediante el commit para actualizar el estado
    // 2do argumento el payload
    async updateUsername({ commit, state }, username) {
      console.log(state);
      const user = await getUser(1)
      console.log(user);

      //commit('updateUsername', username)
      // Una cosa comun es crearse una carpeta "common" con los nombres de las mutaciones que nosotros tengamos para actualizar nuestro estado
      // de esta manera tenemos el autocompletado en los editores de texto
      commit(COMMIT_UPDATE_USERNAME, username)
    }
  },
  modules: {
    profile,
    //channels,
    //messages,
    //contacts
  }
})

export default store