
<script setup>
import { currencyFormatter } from '@/helpers';
import { computed, toRefs } from 'vue';
import IconTrash from '../icons/IconTrash.vue';


const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "Sin titulo"
  },
  description: {
    type: String,
    default: 'Sin descripcion'
  },
  amount: {
    type: Number,
    default: 0
  }
})

const { id, title, description, amount } = toRefs(props)

const emit = defineEmits(["delete"])

const deleteMovement = (event) => {
  event.preventDefault()
  // console.log(id.value);
  emit("delete", id.value)
}

const amountVisual = computed(() => {
  return currencyFormatter.format(amount.value)
})

const amountClass = computed(() => {
  return amount.value > 0 ? 'green' : 'red'
})

</script>

<template>
  <div class="movement">
    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <a @click="deleteMovement">
        <IconTrash />
      </a>
      <p :class="amountClass">
        {{ amountVisual }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.movement {
  display: flex;
  justify-content: space-between;
  padding-block: .5rem;
  background-color: rgb(102 207 211 / .1);
  border-radius: 1rem;
  padding-inline: 1rem;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  max-width: calc(100% - 11ch);
}

h3 {
  font-weight: bold;
  color:rgb(84, 84, 84)
}

.content p {
  width: inherit;
  word-wrap: break-word;
  color:rgb(84, 84, 84)
}

.action {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  width: 11ch;
  overflow: hidden;
}

.action p {
  font-weight: 500;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>