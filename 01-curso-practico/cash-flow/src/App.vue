<script setup>  
  import SplashScreen from './components/SplashScreen.vue'; 
  import { defineAsyncComponent } from 'vue';

  const HomePage = defineAsyncComponent(()=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(import('@/components/Home.vue'))
      },1000)
    })    
  })

</script>

<template>
  <!-- <h1>Cash Flow</h1>   -->
  <Suspense>
    <template #default>    
      <HomePage/> 
    </template>
    <template #fallback>
      <SplashScreen/>
    </template>
  </Suspense>
</template>

<style>
  html,
  body,
  #app{
    min-height: 100vh;
    width: 100%;    
  }
</style>
