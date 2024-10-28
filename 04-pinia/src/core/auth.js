// Como hacemos uso de pinia fuera de los componentes osea en archivos js
// la unica regla es usar pinia luego de que haya sido definidos
import useProfileStore from '@/stores/profile.js'

const login = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        //username: 'nerd diana'
        username: 'diana'
      })
    }, 2500)
  })
}

export const main = async () => {
  const profileStore = useProfileStore()
  const user = await login()
  console.log(user)
  profileStore.username = user.username
  profileStore.status = 'active'
}
