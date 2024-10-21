<script setup>
const emit = defineEmits(['next', 'prev'])

const next = () => {
  emit('next')
}
const prev = () => {
  emit('prev')
}
</script>

<template>
  <button class="carousel-control prev" @click="prev">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg>
  </button>
  <button class="carousel-control next" @click="next">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  </button>
</template>

<style scoped>
.carousel-control {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 10;
  top: calc(50% - 20px);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}

.prev {
  left: 5px;
}

.next {
  right: 5px;
}
</style>
