import { ref } from 'vue';
const toasts = ref<{ message: string; type: string }[]>([]);
export function createToast() {
	const addToast = (message: string, type: 'success' | 'error' = 'success') => {
		toasts.value.push({ message, type });
		setTimeout(() => {
			toasts.value.shift();
		}, 3000);
	};
	return { toasts, addToast };
}
