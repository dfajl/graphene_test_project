import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
//import HomeView from '@/views/HomeView.vue'; // создадим позже

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		//component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		//component: () => import('@/views/AboutView.vue'), // ленивое подключение
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
