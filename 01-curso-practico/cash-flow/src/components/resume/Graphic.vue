<script setup>
import { computed, toRefs, ref, watch } from 'vue'

const props = defineProps({
  amounts: {
    type: Array,
    default: () => []
  }
})

const { amounts } = toRefs(props)

// este calculo ll tenemos explicado en la carpeta public como png
const amountToPixel = (amount) => {
  // el alto del svg que usamos es de 200
  // Sacamos el monto minimo y maximo de los ultimos 30 montos que hayamos tenido
  const min = Math.min(...amounts.value)
  const max = Math.max(...amounts.value)
  // hayamos el monto pero en una escala de 0 a 100 por eso sumanos el minimo monto tanto en el minmax como el amountvalue
  const amountValue = Math.abs(min) + amount
  const minmax = Math.abs(max) + Math.abs(min)
  // calculamos el resultado del valor en pixeles multiplicando por 2 ya que el tamaño del svg es de 200 y redondeamos a 2 decimales
  const res = (((amountValue * 100) / minmax) * 2).toFixed(2)
  // restamos el valor a 200 ya que los valores en el grafico el valor mas alto deberia ser 0 en este caso y el mas bajo 200
  return 200 - res
}

const points = computed(() => {
  // console.log(amounts.value.join(','));

  const total = amounts.value.length

  return (
    '0,100 ' +
    amounts.value
      .map((point, index) => {
        // este calculo es para saber la posicion inicial que tendra en X cada valor de los montos que tomemos
        // 300 porque definimos 300 el ancho del svg que estamos utilizando
        const x = ((300 / total) * (index + 1)).toFixed(2)
        // para el calculo en Y
        const y = amountToPixel(amounts.value[index])

        return `${x},${y}`
      })
      .join(' ')
  )
})

// para saber el punto exacto en el que nos quedamos en cero
const zero = computed(() => {
  return amountToPixel(0) || 0
})

// para la interaccion del grafico -> osea la linea que al hacer click en el grafico nos indicara el monto
/*
  usaremos tres 3ventos
  touchstart -> escuchara el evento en el que colocamos el dedo en la pantalla 
  touchmove -> mientras el dedo este encima de la pantalla
  touchend -> cuando dejas de tocar la pantalla con el dedo
*/
const pointerLine = ref(0)
const showPointer = ref(false)

const untap = () => {
  showPointer.value = false
}

const tap = (event) => {
  event.stopPropagation()

  // de event nos importara 2 valores target para el elemento html y manipularlo el segundo touches una lista de los eventos touch que sucedieron
  const { target, touches } = event
  showPointer.value = true
  // console.log(target , touches);
  // para obtener el tamaño del svg
  // console.log(target.getBoundingClientRect());
  const elementWidth = target.getBoundingClientRect().width // con esto el ancho del elemento
  // console.log("ancho del elemento ",elementWidth)
  const elementX = target.getBoundingClientRect().x // con esto la posicion en x desde la que comienza el elemento ya que tiene un padding en linea  
  // console.log("inicio del elemento en X ",elementX)
  const touchX = touches[0].clientX // esto nos revolvera el valor en X que clickeamos pero en toda la pantalla
  // console.log("Touch en la pantalla ",touchX)
  // ahora para que nos de el valor en escala del svg multiplicamos por 300 porque es el ancho de la grafica y dividimos por el ancho del elemento
  // nota: el ancho del elemento en getBoundingClient no es exactamente 300 ya que este ancho toma medidas como puede ser el scroll bar margenes rellenos etc
  // multiplicamos por 300 para que vaya de 0 a 300 y dividimos por el ancho del elemento obtenido por el getBoundingClientReact para que sea esa escala y luego posicionamos ese punto en la linea
  pointerLine.value = ((touchX - elementX) * 300) / elementWidth
}

const emit = defineEmits(['selectAmount'])

// watch(pointerLine,(newValue, oldValue) => {
watch(pointerLine,(newValue) => {
  // dividimos entre 300 porque es el ancho del svg
  // y multiplicamos por la longitud de los montos ya que es la division que estamos tomando sobre los 30 ultimos montos que tomamos en cuenta
  const index = Math.abs(Math.ceil((newValue / 300) * amounts.value.length))
  if (index <= 0 || index >= amounts.value.length + 1) return
  const amountLabel = amounts.value[index - 1]
  emit('selectAmount', { amountSelected: amountLabel, index: index-1})
})

</script>

<template>
  <div class="graphic">
    <!-- {{ pointerLine }} -->
    <!--inicia en 0 0 y tiene 300 de ancho y 200 final-->
    <svg viewBox="0 0 300 200" @touchstart="tap" v-on:touchmove="tap" @touchend="untap">
      <!--Esta seria la linea central gris en medio del grafico -> usamos la funcion computada para mostrar el valor en el eje y en el que tengamos 0 Bs -->
      <line stroke="#c6c6c6" stroke-width="2" x1="0" v-bind:y1="zero" x2="300" :y2="zero" />
      <!--Esta seria la linea que mostrara la grafica sobre las ganancias-->
      <!--<polyline fill="none" stroke="#252525 " stroke-width="2" points="0,0 100,100 200,100 300,200" />-->
      <polyline fill="none" stroke="#252525 " stroke-width="2" :points="points" />
      <!--Esta seria la linea vertical que se mostrara si seleccionamos en algun lugar del grafico-->
      <line
        stroke="#638D25 "
        stroke-width="2"
        :x1="pointerLine"
        y1="0"
        :x2="pointerLine"
        y2="200"
        v-show="showPointer"
      />
    </svg>
    <p>Ultimos 30 dias</p>
  </div>
</template>

<style scoped>
.graphic {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

svg {
  width: 100%;
}

p {
  text-align: center;
}
</style>
