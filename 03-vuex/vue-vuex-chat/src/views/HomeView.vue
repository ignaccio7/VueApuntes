<script>
import { RouterView, RouterLink } from 'vue-router'
import InputSearch from '@/components/InputSearch.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ChatItem from '@/components/ChatItem.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    RouterView,
    RouterLink,
    InputSearch,
    ProfileCard,
    ChatItem
  },
  data() {
    return {
      search: '',
      profile: {
        username: 'Diana Nerd',
        avatar: '/avatars/avatar.jpg'
      },
      channels: [
        { id: 1, name: 'General', messages: 27 },
        { id: 2, name: 'Emergencias', messages: null },
        { id: 3, name: 'Anuncios', messages: 2 },
        { id: 4, name: 'Proyecto 1', messages: 24 },
        { id: 5, name: 'Non-work', messages: null },
        { id: 6, name: 'Atención a clientes', messages: 120 }
      ]
    }
  },
  /*computed: mapState({
      username: (state) => state.username
  }),*/
  /*computed: {
    ...mapState({
      username: (state) => state.username
    }),
    status() {
      return 'active'
    },
    // o
    //status:() => {
    //  return 'active'
    //},
  },*/
  computed:
  {
    // mapState nos traera los valores del store: como son reactivas las metemos dentro de las propiedades computadas
    //...mapState(['status']),
    ...mapState(['status']),
    //...mapGetters(['firstName']),
    // Para consumirlo desde el modulo de profile
    ...mapGetters('profile', ['firstName']),

    ...mapGetters('channels', ['getChannels']),
    /*username(){
      return this.$store.state.username
    }*/    
  },
}
</script>

<template>
<div class="home">
  <aside>
    <InputSearch v-model="search" />
    <!--firstName('')-->
    <!--:username="$store.state.username"-->
    <!--con la computada quedaria :username="username"-->
    <!--con el getter sin argumento :username="$store.getters.firstName"-->
    <!--pasandole un argumento "closure"
    :username="$store.getters.firstName('--')"-->
    <!-- consumiendo el getter haciendo uso del spreedoperator
      :username="firstName('+')"
     -->
    <!-- para consumir el getter desde un modulo 
      ...mapGetters(['profile/firstName']),
      :username="firstName('+')"
    -->

    <ProfileCard
      :avatar="profile.avatar"      
      :username="firstName('+')"
      :status="status"
    />
    <RouterLink to="/" class="channels-title">Canales <Icon icon="carbon:hashtag" /></RouterLink>
    <div class="channels">
      <!--v-for="channel in getChannels(search)"-->
      <ChatItem
        v-for="channel in getChannels(search)"
        :key="channel.id"
        :id="channel.id"
        :name="channel.name"
        :messages="channel.messages"
      />
    </div>
  </aside>
  <main>
    <RouterView />
  </main>
</div>
</template>

<style lang="scss" scoped>
.home {
  @apply flex h-screen;
  aside {
    @apply flex flex-col w-80 min-w-max px-6 py-5 gap-4 bg-zinc-800;
    .channels-title {
      @apply flex items-center gap-2 mt-2 ml-3 text-xl font-bold text-neutral-200;
    }
    .channels {
      @apply flex flex-col gap-2 overflow-y-auto;
    }
  }
  main {
    @apply w-full;
  }
}
</style>