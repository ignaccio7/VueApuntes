<script setup>

	import { reactive, watch } from 'vue'
	import { useRoute } from 'vue-router'

	const props = defineProps(['chatId'])
	const route = useRoute()	

	const messages = reactive([])

	watch(() => route.params.chatId,
		(newValue, oldValue) => {
			// aqui hariamos algun tipo de fetch nuevamente o lo que sea
			console.log({ newValue, oldValue })
			/*messages.push([
				{ id: 1, content: 'Mensaje 1 per 1', author: 1 },
				{ id: 2, content: 'Mensaje 2 per 2', author: 2 },
				{ id: 3, content: 'Mensaje 3 per 3', author: 3 },
				{ id: 4, content: 'Mensaje 4 per 1', author: 1 },
				{ id: 5, content: 'Mensaje 5 per 2', author: 2 },
			])*/
			messages.splice(
				0, messages.length,
				{ id: 1, content: 'Mensaje 1 per 1', author: 1 },
				{ id: 2, content: 'Mensaje 2 per 2', author: 2 },
				{ id: 3, content: 'Mensaje 3 per 3', author: 3 },
				{ id: 4, content: 'Mensaje 4 per 1', author: 1 },
				{ id: 5, content: 'Mensaje 5 per 2', author: 2 },
			)
		},
		{
			// Para que se ejecute automaticamente se define el watcher
			immediate: true
		}
	)

	
</script>

<template>
	{{ props }} <br>
	{{ messages }}
</template>