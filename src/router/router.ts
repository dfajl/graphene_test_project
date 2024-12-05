import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import UserCard from '@/components/UserCard.vue';

const routes: RouteRecordRaw[] = [
	/* {
		path: '/',
		name: 'MainPage',
		component: () => MainPage,
	}, */
	{
		path: '/',
		name: 'UserCard',
		component: () => UserCard,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
