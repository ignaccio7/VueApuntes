<template>
    <div class="splashscreen">
      <IconLogo/>
      <Title/> 
    </div>
</template>

<script setup>
  import IconLogo from './icons/IconLogo.vue';
import Title from './Title.vue';
</script>

<style scoped>
    .splashscreen{
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;      
      justify-content: center;
      align-items: center;
    }
</style>