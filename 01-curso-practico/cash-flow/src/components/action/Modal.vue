
<script setup>
import IconClose from '../icons/IconClose.vue';

const emits = defineEmits(['close'])

const closeModal = () => emits('close')


</script>

<template>
  <div class="modal">
    <header>
      <h2>Agregar nuevo movimiento</h2>
      <a @click="closeModal">
        <IconClose />
      </a>
    </header>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  inset: 0;
  background-color: white;
  z-index: 20;
  padding: 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-weight: bold;
  color: rgb(67, 67, 67);
}

a {
  display: inherit;
}

.body {
  padding-block: 1rem;
}
</style>