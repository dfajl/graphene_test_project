<template>
	<div class="main-wrapper" v-if="sortedByNameUsers?.length">
		<SideMenu
			:sorted-by-name-users="sortedByNameUsers"
			@user-selected="handleUserSelected"
			:sorted-by-rating-users="sortedByRatingUsers"
		/>
		<UserCard v-if="checkedUser" :user-data="checkedUser" />
		<h1 v-else :style="{ margin: '0 auto' }">Select a client!</h1>
	</div>
</template>

<script setup lang="ts">
import UserCard from '@/components/UserCard.vue';
import SideMenu from '@/components/SideMenu.vue';
import { useMainStore } from '@/stores/mainStore';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const { sortedByNameUsers, sortedByRatingUsers } = storeToRefs(mainStore);

mainStore.fetchUsers();

const checkedUserId = ref(0);

const checkedUser = computed(() => {
	const usersCopy = [...sortedByNameUsers.value];
	return usersCopy.find((item) => item.id === checkedUserId.value);
});

const handleUserSelected = (userId: number) => {
	checkedUserId.value = userId;
};
</script>

<style scoped lang="scss">
.main-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
