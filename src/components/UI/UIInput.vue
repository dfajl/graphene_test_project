<template>
	<component
		:is="tag"
		:value="props.modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		:placeholder="placeholder"
		class="ui-input"
		:rows="tag === 'textarea' ? rows : null"
		:type="tag === 'input' ? type : null"
		:class="{ 'ui-input__textarea': tag === 'textarea' }"
	/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: '',
	},
	tag: {
		type: String,
		default: 'input', // 'input' or 'textarea'
		validator: (value: string) => ['input', 'textarea'].includes(value),
	},
	type: {
		type: String,
		default: 'text', // Only applies to 'input'
	},
	rows: {
		type: Number,
		default: 3, // Only applies to 'textarea'
	},
});
</script>

<style scoped lang="scss">
.ui-input {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
	width: 100%;
	box-sizing: border-box;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: #3498db;
	}

	&__textarea {
		resize: vertical;
	}
}
</style>
