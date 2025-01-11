<template>
	<div class="main-wrapper" v-if="usersList?.length">
		<SideMenu
			:filtered-sorted-by-name-users="filteredSortedByNameUsers"
			:filtered-sorted-by-rating-users="filteredSortedByByRatingUsers"
		/>
		<UserCard v-if="checkedUser" :user-data="checkedUser" />
		<h1 v-else class="fixedPosition">Select a client!</h1>
	</div>
	<div v-else class="loading">Загрузка...</div>
</template>

<script setup lang="ts">
import UserCard from '@/components/UserCard.vue';
import SideMenu from '@/components/SideMenu.vue';
import { useMainStore } from '@/stores/mainStore';
import { computed, ref, provide } from 'vue';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const { filteredSortedByNameUsers, filteredSortedByByRatingUsers, usersList } = storeToRefs(mainStore);

mainStore.fetchUsers();
const checkedUserId = ref(0);

provide('checkedUserId', checkedUserId);

const checkedUser = computed(() => {
	const usersCopy = [...filteredSortedByNameUsers.value];
	return usersCopy.find((item) => item.id === checkedUserId.value);
});
</script>

<style scoped lang="scss">
.main-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.fixedPosition {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-30%, -50%);
		@media (max-width: 600px) {
			font-size: 1.5rem;
			left: 60%;
		}
	}
}
.loading {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 2rem;
}
</style>
