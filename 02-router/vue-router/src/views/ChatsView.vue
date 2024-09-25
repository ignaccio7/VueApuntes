<template>
	<div>
		<aside>
			<h2>Chats</h2>
			<ul>
				<li v-for="chat in chats" :key="chat.id">
					<RouterLink :to="`/chats/${chat.id}`">
						{{ chat.name }}
					</RouterLink>
				</li>
			</ul>

			<h2>Chats With Props</h2>
			<ul>
				<li v-for="chat in chats" :key="chat.id">
					<RouterLink :to="`/chats/props/${chat.id}`">
						{{ chat.name }}
					</RouterLink>
				</li>
			</ul>

			<article>
				<h2>Mensajes</h2>
					
				<RouterView />

			</article>
		</aside>
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const chats = ref([
		{ id:1, name:'Nestor'},
		{ id:2, name:'Maria'},
		{ id:3, name:'Josue'},
	])
</script>