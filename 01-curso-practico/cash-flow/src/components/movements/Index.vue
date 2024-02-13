
<script setup>
import Movement from './Movement.vue';
import { toRefs } from 'vue';

const props = defineProps({
  movements: {
    type: Array,
    default: () => []
  }
})

const { movements } = toRefs(props)

const emit = defineEmits(['remove'])

const removeMovement = (id) => {
  // console.log("eliminar", id);
  emit('remove',id)
}

/*onMounted(()=>{
  console.log('Component Movements');
  console.log(movements.value);
})*/

</script>

<template>
  <div class="title">
    Historial
  </div>
  <div class="movements">
    <Movement v-for="{ id, title, description, amount } in movements" :key="id" :id="id" :title="title"
      :description="description" :amount="amount" @delete="removeMovement" />
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  color: rgb(0, 176, 182);
  font-size: 1.5rem;
  padding-left: 1rem;
}

.movements {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background-color: white;
}
</style>