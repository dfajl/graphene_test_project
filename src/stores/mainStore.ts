import { defineStore } from 'pinia';
import type { User } from '@/types/UserData';

export type MainStoreState = {
	usersList: User[] | null;
	fetchUsersError: string;
};

export const useMainStore = defineStore('mainStore', {
	state: (): MainStoreState => ({
		usersList: null,
		fetchUsersError: '',
	}),
	actions: {
		async fetchUsers() {
			try {
				const url = 'https://reqres.in/api/users';
				const response = await fetch(url);
				if (response.ok) {
					const { data } = await response.json();
					this.usersList = data;
				} else {
					console.error('Ошибка HTTP: ' + response.status);
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error('Unexpected error', error);
				}
			}
		},
	},
	getters: {
		allUsers(): User[] | null {
			return this.usersList;
		},
	},
});
