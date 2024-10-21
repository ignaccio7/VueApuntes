<script setup>
import { ref } from 'vue'

import Carousel from './components/Carousel.vue'

const slides = ref([
  'https://picsum.photos/id/1/900/400',
  'https://picsum.photos/id/2/900/400',
  'https://picsum.photos/id/3/900/400',
  'https://picsum.photos/id/4/900/400',
  'https://picsum.photos/id/5/900/400',
])
</script>

<template>
  <main>
    <Carousel 
      :slides="slides" 
      :controls="true" 
      :indicators="true"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
