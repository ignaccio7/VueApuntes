
<script setup>
import { reactive } from 'vue';
import Button from '../Button.vue'
import IconCoins from '../icons/IconCoins.vue';

const showModal = defineModel()

const defaultMovement = {
  title: '',
  amount: '',
  description: '',
  movementType: 'Ingreso'
}

const movement = reactive({
  ...defaultMovement
})

const emit = defineEmits(['create'])

const handleForm = (event) => {
  event.preventDefault()
  showModal.value = false
  emit('create',{
    ...movement,
    amount: movement.movementType === 'Ingreso' ? movement.amount : -movement.amount,
    time: new Date(),
    id: crypto.randomUUID()
  })
  Object.assign(movement, defaultMovement)
}

</script>

<template>
  <form @submit="handleForm">
    <label class="field">
      Titulo:
      <input type="text" v-model="movement.title" placeholder="Compra, Deposito, Retiro, ..." autofocus required>
    </label>
    <label class="field">
      Monto:
      <input type="number" v-model="movement.amount" placeholder="..., 1000, 500, 200, 100" required>
    </label>
    <label class="field">
      Descripcion:
      <textarea rows="5" v-model="movement.description" placeholder="Deposito a nombre de en lugar de ..."></textarea>
    </label>
    <div class="field field--radio">
      <label>
        <input type="radio" v-model="movement.movementType" value="Ingreso" name="tipo">
        <span>Ingreso</span>
      </label>
      <label>
        <input type="radio" v-model="movement.movementType" value="Gasto" name="tipo">
        <span>Gasto</span>
      </label>
    </div>
    <Button class="btn">
      <IconCoins />
      Registrar Movimiento
    </Button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.field {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 500;
}

input,
textarea {
  padding: .5rem;
  margin-block: .5rem;
  border: thin solid black;
  border-radius: .5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
}

input[type="number"] {
  text-align: right;
}

input[type="radio"] {
  display: none;
}

.field--radio span {
  display: flex;
  gap: .5rem;
  margin-block: .5rem;
  font-weight: 500;
}

.field--radio span::before {
  content: "";
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid black;
  border-radius: 50%;
}

input[type="radio"]:checked+span::before {
  background-color: rgb(86, 121, 33);
  box-shadow: 0 0 10px #719ECE;
  border: none;
}

input:focus,
textarea:focus {
  outline: none !important;
  border-color: rgb(68, 96, 26);
  box-shadow: 0 0 10px #87ce71;
}
label{
  color: black;
}
</style>