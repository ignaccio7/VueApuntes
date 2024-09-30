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
      status: null
    }
  },
  // Los getters son practicamente lo mismo que las funciones computadas en el options api y tambien seran reactivos
  getters: {
    // Para consumir el estado del modulo separado en profile
    //firstName: (state, getters, rootState) => (separator) => {
    //  return rootState.profile.username.split(' ').join(separator)
    //}
  },
  // las mutaciones siempre son funciones sincronas para modificar el estado
  mutations: {    
    [COMMIT_SET_STATUS](state, payload) {
      state.status = payload
    }
  },
  // aqui es el lugar ideal para colocar la logica del negocio y si pueden ser funciones asincronas
  // Para ejecutar una action es dispatch - para el mutation es commit
  actions: {
  },
  modules: {
    profile,
    //channels,
    //messages,
    //contacts
  }
})

export default store