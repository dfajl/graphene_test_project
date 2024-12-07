<template>
	<div class="points-counter">
		<button class="control-btn" @click="decrement">-</button>
		<div class="points">{{ model }} points</div>
		<button class="control-btn" @click="increment">+</button>
	</div>
</template>

<script setup lang="ts">
const increment = () => {
	model.value++;
};

const decrement = () => {
	if (model.value > 0) model.value--;
};

const model = defineModel<number>();
</script>

<style scoped lang="scss">
.points-counter {
	width: 50%;
	margin: 0 auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	.control-btn {
		background-color: #a1a1a1;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		font-size: 0.5rem;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #7a7a7a;
		}

		&:active {
			background-color: #1d6a96;
		}
	}

	.points {
		border-radius: 5px;
		text-align: center;
		width: 100%;
		background: #e5e5e5;
		font-size: 1.2rem;
		font-weight: bold;
		color: #333;
	}
	@media (max-width: 768px) {
		width: 30%;
		.control-btn {
			font-size: 0.3rem;
		}
		.points {
			font-size: 1.2rem;
		}
	}
}
</style>
