
<script setup>
import { ref } from 'vue';
import IconCoins from '../icons/IconCoins.vue';
import Modal from './Modal.vue';
import Form from './Form.vue'
import Button from '../Button.vue';

const showModal = ref(false)

const handleModal = () => {
  showModal.value = !showModal.value
}

</script>

<template>
  <Button class="btn" v-on:click="handleModal">
    <IconCoins />
    Agregar movimiento
  </Button>
  <teleport to="#app">
    <Modal v-show="showModal" @close="showModal = false">
      <!-- Aqui ira el formulario para agregar -->
      <Form v-model="showModal" />
    </Modal>
  </teleport>
</template>

<style scoped></style>