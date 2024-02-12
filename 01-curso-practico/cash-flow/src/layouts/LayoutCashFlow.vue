<script setup>
import { ref } from 'vue';

const showMovements = ref(false)

</script>

<template>
  <div class="container">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="resume">
      <slot name="resume"></slot>
    </main>
    <section class="movements" v-bind:class="{ 'show': showMovements }">
      <div class="grip" v-on:click="showMovements = !showMovements"></div>
      <slot name="movements"></slot>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-inline: auto;
  border-left: 1px solid #05050520;
  border-right: 1px solid #05050520;
  position: relative;
  overflow: hidden;
}

.resume {
  z-index: 10;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.movements {
  z-index: 20;
  border-top: 1px solid rgb(184, 184, 184);
  box-shadow: 2px -10px 20px 2px rgba(0, 0, 0, 0.3);
  border-radius: 2rem;
  padding-inline: 1rem;
  position: absolute;
  background-color: #fff;
  top: 90%;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 5rem;
  transition: all .3s ease-in-out;
}

.movements.show {
  top: 10%;
}

.movements .grip {
  border: thick solid rgb(207, 207, 207);
  width: 50%;
  margin-inline: auto;
  margin-block: 2rem;
  border-radius: 2rem;
  cursor: pointer;
}

@media (width <=500px) {

  /** Para ocultar la barra lateral en dispositivos moviles */
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>