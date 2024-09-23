<template>
	<h1>Chat de la persona: {{ route.params.chatId }} </h1> 
	<div v-for="message in messagesFiltered" :key="message.id">
		{{ message.content }}		
	</div>
</template>

<script setup>
	import { reactive, computed } from 'vue'
	import { useRoute } from 'vue-router'

	const route = useRoute()

	const messages = reactive([
		{ id: 1, content: 'Mensaje 1 per 1', author: 1 },
		{ id: 2, content: 'Mensaje 2 per 2', author: 2 },
		{ id: 3, content: 'Mensaje 3 per 3', author: 3 },
		{ id: 4, content: 'Mensaje 4 per 1', author: 1 },
		{ id: 5, content: 'Mensaje 5 per 2', author: 2 },
	])

	const messagesFiltered = computed(() => {
		const idAuthor = Number(route.params.chatId);
		return messages.filter(m => m.author === idAuthor);
	})
	
</script>