<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
	isBoldFont: {
		type: Boolean,
		default: false,
	},
	marginBottom: {
		type: String,
		default: '0px',
	},
});
</script>

<template>
	<button class="btn" :class="{ bold: isBoldFont }" :style="`margin-bottom: ${marginBottom};`">
		<slot> Click </slot>
	</button>
</template>

<style lang="scss" scoped>
.btn {
	font-family: 'Montserrat', sans-serif;
	font-weight: 600;
	padding: 5px;
	background: rgb(24, 124, 255);
	margin: 0 auto;
	border-radius: 5px;
	transition: 0.2s linear;
	color: #fff;
	width: 30%;
	&:hover {
		cursor: pointer;
		background: rgba(96, 165, 245, 0.722);
	}
}
.bold {
	font-weight: bold;
}
</style>
