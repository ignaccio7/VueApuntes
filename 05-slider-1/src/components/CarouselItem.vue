<script setup>
import { toRefs, computed } from 'vue'

const emit = defineEmits(['mouseenter', 'mouseout'])

const props = defineProps(['slide', 'index', 'currentSlide', 'direction'])

const { slide, 
  index, 
  currentSlide, 
  direction } = toRefs(props)

  const transitionEffect = computed(() => {
    return direction.value === 'right' ? 'slide-in' : 'slide-out'
  })



</script>

<template>
  <Transition :name="transitionEffect">
    <img
      :src="slide"
      :alt="`Imagen numero ${index}`"
      v-show="index === currentSlide"
      @mouseenter="() => { emit('mouseenter') }"
      @mouseout="emit('mouseout')"
    />
  </Transition>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

/* Aqui es a donde tiene que llegar */
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: transform 0.5s ease-in-out;
  transform: translateX(0%);
}
/*RIGHT*/
/* Aqui es cuando entra */
.slide-in-enter-from {
  transform: translateX(-100%);
}
/* Aqui es cuando sale */
.slide-in-leave-to {
  transform: translateX(100%);
}
/*LEFT*/
/* Aqui es cuando entra */
.slide-out-enter-from {
  transform: translateX(100%);
}
/* Aqui es cuando sale */
.slide-out-leave-to {
  transform: translateX(-100%);
}
</style>
