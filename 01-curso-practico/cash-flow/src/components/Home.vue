<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import LayoutCashFlow from '../layouts/LayoutCashFlow.vue'
import HeaderComponent from './HeaderComponent.vue'
/**Resume */
import Resume from './resume/Index.vue'
/**Movements */
import Movements from './movements/Index.vue'
/**Action */
import Action from './action/Index.vue'
/**Graphic */
import Graphic from './resume/Graphic.vue'

const label = ref(null)
const amount = ref(null)

/*const movements = reactive([
  {
    id: '1',
    title: 'Compra en tienda',
    description: 'Ropa',
    amount: -50.75,
    time: new Date('01-01-2024')
  }, // de momento este no entra porque no esta entre el rango de fechas
  {
    id: '2',
    title: 'Depósito',
    description: 'Ingreso de salario',
    amount: 350.0,
    time: new Date('01-15-2024')
  },
  {
    id: '3',
    title: 'Retiro en cajero',
    description: 'Retiro de efectivo',
    amount: -100.0,
    time: new Date('01-15-2024')
  },
  {
    id: '4',
    title: 'Pago de factura',
    description: 'Electricidad',
    amount: -50.5,
    time: new Date('01-23-2024')
  },
  {
    id: '5',
    title: 'Transferencia',
    description: 'Pago a amigo',
    amount: -200.0,
    time: new Date('01-25-2024')
  },
  {
    id: '6',
    title: 'Compra en línea',
    description: 'Libros',
    amount: -45.99,
    time: new Date('02-03-2024')
  },
  {
    id: '7',
    title: 'Ingreso adicional',
    description: 'Bonificación',
    amount: 200.0,
    time: new Date('02-08-2024')
  },
  {
    id: '8',
    title: 'Pago de préstamo',
    description: 'Cuota mensual',
    amount: -75.0,
    time: new Date('02-10-2024')
  },
  {
    id: '9',
    title: 'Compra de alimentos',
    description: 'Supermercado',
    amount: -65.25,
    time: new Date('02-11-2024')
  },
  {
    id: '10',
    title: 'Ingreso de reembolso',
    description: 'Gastos médicos',
    amount: 50.0,
    time: new Date('02-12-2024')
  }
  // { id: 11, title: 'Ingreso de reembolso', description: 'Gastos vGastGastosGastosGastosGastosGastosGastosGastosGastosGastosGastosGastosGastos mé', amount: 1000.0 }
])
*/
const movements = ref([])

// const amounts = ref(movements.map(movement => movement.amount))
const amounts = computed(() => {
  // console.log(movements);
  // return movements.map(mov=>mov.amount)

  // con esto obtenemos los movimientos de los ultimos 30 dias
  const lastDays = movements.value
    .filter((movement) => {
      // sacamos la fecha de hoy
      const today = new Date()
      // sacamos la fecha hace 30 dias atras -> con getDate obtenemos el numero del dia de la fecha
      const oldDay = today.setDate(today.getDate() - 30)
      return movement.time > oldDay
    })
    .map((movement) => movement.amount)

  // lo que tendria que pasar esque si nosotros tenemos un gasto el dia1 de -100 y dia2 de -200 entonces para la grafica debemos pasar como si el dia2 fuera -300
  // asi tenemos que ir sumando los valores
  const results = []
  lastDays.forEach((mov, index) => {
    let sum = results[index - 1] || 0
    results[index] = mov + sum
  })
  return results
})

// Para guardar los datos en el localStorage
const save = () => {
  localStorage.setItem('movements', JSON.stringify(movements.value))
}

// Para poder crear el movimiento
const create = (movement) => {
  // console.log('transmitiendo', movement);
  movements.value.push(movement)
  console.log(movements);
  save()
}

// Para poder eleminiar un movimiento
const remove = (id) => {
  const index = movements.value.findIndex((movement) => movement.id === id)
  movements.value.splice(index,1)
  save()
}

// Para rescatar los datos del localStorage
onBeforeMount(() => {
  const storage = localStorage.getItem('movements')  
  if (storage) {
    const data = JSON.parse(storage).map(mov => ({ ...mov, time: new Date(mov.time) }))
    movements.value = data
  }
})

// Para el monto total
const totalAmount = computed(()=>{
  let sum = 0
  movements.value.forEach(mov=>{
    sum+=mov.amount
  })
  return sum
})

</script>

<template>
  <LayoutCashFlow>
    <template #header>
      <HeaderComponent />
    </template>
    <template #resume>
      <Resume :label="label" :amount="amount" :totalAmount="totalAmount">
        <template #graphic>
          <Graphic :amounts="amounts" />
        </template>
        <template #action>
          <Action @createMovement="create" />
        </template>
      </Resume>
    </template>
    <template #movements>
      <Movements :movements="movements" @remove="remove" />
    </template>
  </LayoutCashFlow>
</template>

<style></style>
