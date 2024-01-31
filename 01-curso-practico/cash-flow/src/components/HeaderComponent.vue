<template>
    <div class="header">
      <div class="layer">
        <IconLogo height="100%" width="100%" @click="handleClick"/>
      </div>
      <div class="title">
        <Title/>    
      </div>
      <span></span>
    </div>
</template>

<script setup>
  import IconLogo from './icons/IconLogo.vue';
  import Title from './Title.vue';

  const handleClick = () => {
    window.location.reload()
  }

</script>

<style scoped>
  .header{    
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 1rem;
    padding-inline: 1rem;
  }
  .layer{
    width: 2rem;
    height: 2rem;
    overflow: hidden;    
    cursor: pointer;
  }
</style>
