<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function handleClick() {
    //router.push('/chats')
    /*router.push({
      path: '/chats',
      query: {
        variable1: 1
      }
    })*/
    router.push({
      path: '/chats',
      query: {
        variable1: 1
      },
      replace: true
      //para que nose guarde un punto en el historial de navegacion
    })
    // para navegacion relativa tenemos router.go(1) go(-2)
  }

</script>

<template>
  <main>
    <h1>HomeView</h1>
    <button @click="handleClick">
      Ir a los chats
    </button>
  </main>
</template>
