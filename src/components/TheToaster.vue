<template>
	<teleport to="body">
		<div class="toast-container" v-if="toasts.length">
			<div v-for="(toast, index) in toasts" :key="index" class="toast" :class="toast.type">
				{{ toast.message }}
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';

const toasts = inject<Ref<{ message: string; type: string }[]>>('toasts');

if (!toasts) {
	console.error('toasts не инжектированы.');
}
</script>

<style scoped lang="scss">
.toast-container {
	position: fixed;
	top: 20px;
	right: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	z-index: 1000;
}

.toast {
	padding: 10px 20px;
	border-radius: 5px;
	color: #fff;
	font-weight: bold;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	animation:
		fadeIn 0.3s ease-out,
		fadeOut 0.5s 2.5s forwards;
	opacity: 1;

	&.success {
		background-color: #33a6fe;
	}

	&.error {
		background-color: #f44336;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeOut {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
		transform: translateY(10px);
	}
}
</style>
