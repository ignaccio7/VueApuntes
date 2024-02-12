
<script setup>

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  gap: .3rem;
  margin-inline: auto;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 2rem;
  border: none;
  color: white;
  background-color: rgb(37, 37, 37);
  font-weight: bold;
}

.btn:hover {
  background-color: rgb(82, 82, 82);
}
</style>