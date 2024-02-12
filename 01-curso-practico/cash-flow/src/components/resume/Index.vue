<template>
  <div class="resume">
    <header>
      <p>{{ visualLabel }}</p>
      <h1>{{ amountCurrency }}</h1>
    </header>
    <div class="graphic">
      <slot name="graphic" />
    </div>
    <div class="action">
      <slot name="action" />
    </div>
  </div>
</template>


<script setup>
import { currencyFormatter } from '@/helpers/index.js'
import { computed } from 'vue';

const { label, amount, totalAmount } = defineProps({
  label: {
    type: String,
    default: 'Total ahorros:'
  },
  amount: {
    type: Number,
    default: 100
  },
  totalAmount: Number
})
// console.log(props);


const visualAmount = computed(() => {
  return amount ? amount : totalAmount
})

const visualLabel = computed(() => {
  return label ? label : 'Total ahorros:'
})

const amountCurrency = computed(() => {
  return currencyFormatter.format(parseInt(visualAmount.value))
})

</script>

<style scoped>
.resume {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: calc(100vh * 0.15);
}

header {
  line-height: 1;
}

p {
  color: rgb(143, 143, 143);
  text-align: center;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  font-weight: bold;
  color: rgb(99, 141, 37);
  font-size: 2.2rem;
}

/* h1::before {
  content: 'Bs ';
} */

.graphic {
  padding-inline: 2rem;
  flex-grow: 1;
}
</style>