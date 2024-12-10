import { defineStore } from 'pinia';
import type { User } from '@/types/UserData';

export type MainStoreState = {
	usersList: ModifiedUser[] | null;
	fetchUsersError: string;
	searchingModel: string;
};

export type ModifiedUser = User & {
	points: number;
	description: string;
};

export const useMainStore = defineStore('mainStore', {
	state: (): MainStoreState => ({
		usersList: null,
		fetchUsersError: '',
		searchingModel: '',
	}),

	actions: {
		async fetchUsers() {
			try {
				const url = 'https://reqres.in/api/users';
				const response = await fetch(url);
				if (response.ok) {
					const { data }: { data: User[] } = await response.json();

					const modifiedData: ModifiedUser[] = [];

					// берем данные из localStorage. Если их нет еще там,
					// то выставляем дефолтные
					data.forEach((item: User) => {
						const storageUser = localStorage.getItem(`${item.first_name} ${item.last_name}`);

						const parsedStorageUser = storageUser ? JSON.parse(storageUser) : null;

						const points = parsedStorageUser?.points || 0;
						const description = parsedStorageUser?.description || '';
						modifiedData.push({ ...item, points: Number(points), description });
					});

					this.usersList = modifiedData;
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
		updateUserList(data: { description: string; points: number; id: number }) {
			console.log(data);
			const user = this.usersList?.find((item) => item.id === data.id);
			user!.description = data.description;
			user!.points = data.points;
		},
	},
	getters: {
		sortedByNameUsers(): ModifiedUser[] | null {
			if (this.usersList?.length) {
				const usersListCopy = [...this.usersList];
				return usersListCopy.sort((user1: ModifiedUser, user2: ModifiedUser) => {
					return user1.last_name.localeCompare(user2.last_name, ['en', 'ru']);
				});
			} else return null;
		},
		sortedByRatingUsers(): ModifiedUser[] | null {
			if (this.usersList?.length) {
				const usersListCopy = [...this.usersList];
				return usersListCopy.sort((user1: ModifiedUser, user2: ModifiedUser) => {
					return -1 * (user1.points - user2.points);
				});
			} else return null;
		},
	},
});
