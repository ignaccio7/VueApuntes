<script setup>
	import { toRefs } from 'vue'

	const emit = defineEmits(['switchSlide'])

	const props = defineProps(['total', 'currentSlide'])

	const { total, currentSlide } = toRefs(props)

</script>

<template>
	<div class="carousel-indicators">
		<button 
			v-for="(item, index) in total"
			:class="{ active: index === currentSlide }"
			@click="emit('switchSlide', index)"
		/>		
	</div>
</template>

<style scoped>
	.carousel-indicators {
		position: absolute;
		z-index: 10;
		padding: 10px;
		bottom: 0;
		left: 50%;		
		margin-inline: auto;
		transform: translateX(-50%);
		display: flex;
		gap: 5px;
	}

	button {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: none;
		/*background-color: #34343470;*/
		background-color: #F58282;
		opacity: .7;
		cursor: pointer;
	}

	.active {
		/*background-color: #343434;*/		
		background-color: red;
	}

</style>