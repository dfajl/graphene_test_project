import { ref } from 'vue';
const toasts = ref<{ message: string; type: string }[]>([]);

//  данная функция создает тостер в main.ts и замыкается на единичном toasts
export function createToast() {
	const addToast = (message: string, type: 'success' | 'error' = 'success') => {
		toasts.value.push({ message, type });
		setTimeout(() => {
			toasts.value.shift();
		}, 3000);
	};
	return { toasts, addToast };
}
