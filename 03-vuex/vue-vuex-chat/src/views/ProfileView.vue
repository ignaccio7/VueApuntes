<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      //username: (state) => state.username
      // Como accedemos al modulo de profile a su stado username
      username: (state) => state.profile.username
    })
  },
  methods: {
    // esto es para ejecutarlo mediante mutaciones
    //...mapMutations(['updateUsername'])
    // esto mediante acciones
    //...mapActions('profile', ['updateUsername']),
    ...mapActions('profile',['updateUsername'])
  },
}
</script>

<template>
  <div class="profile">
    <div class="box">
      <img src="/avatars/avatar.jpg" alt="avatar" />
      <label for="username">Nombre de usuario</label>
      <!--@input="updateUsername($event.target.value)"-->
      <!--como llamamos una mutation
      @input="$store.commit('updateUsername',$event.target.value)"-->
      <input
        type="text"
        placeholder="Jane Smith"
        :value="username"
        @input="updateUsername($event.target.value)"
      />
      <button @click="$router.push('/')">Acceder</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  @apply flex justify-center items-center h-screen;
  .box {
    @apply flex flex-col items-center gap-2 p-6 rounded-xl bg-zinc-800;
    img {
      @apply w-32 rounded-full border-8 border-zinc-600;
    }
    label {
      @apply w-full;
    }
    input {
      @apply px-3 py-2 rounded-md bg-zinc-900;
    }
    button {
      @apply w-full px-3 py-2 mt-2 rounded-md bg-zinc-600;
    }
  }
}
</style>
