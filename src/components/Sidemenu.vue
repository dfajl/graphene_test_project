<template>
	<div class="side-menu__wrapper" v-if="isSideMenuVisible">
		<SideMenuHeader @list-view-selected="handleListViewSelected" />
		<SideMenuUsersList :users-for-render="usersForRender" :list-view="listView" />
	</div>
	<div v-else class="toggleMenuIcon">
		<img
			@click="updateSideMenuVisible(!isSideMenuVisible)"
			src="@/assets/icons/ArrowRightIcon.svg"
			alt="Arrow Icon"
			class="arrow-icon"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import { ModifiedUser } from '@/stores/mainStore';
import SideMenuHeader from '@/components/SideMenuHeader.vue';
import SideMenuUsersList from '@/components/SideMenuUsersList.vue';

const isSideMenuVisible = ref(true);
function updateSideMenuVisible(value: boolean) {
	isSideMenuVisible.value = value;
}
provide('sideMenu', { isSideMenuVisible, updateSideMenuVisible });

const props = defineProps<{
	filteredSortedByNameUsers: ModifiedUser[];
	filteredSortedByRatingUsers: ModifiedUser[];
}>();

const listView = ref('client');

const usersForRender = computed(() => {
	if (listView.value === 'client') {
		return props.filteredSortedByNameUsers;
	} else {
		return props.filteredSortedByRatingUsers;
	}
});

const handleListViewSelected = (view: string) => {
	listView.value = view;
};
</script>

<style scoped lang="scss">
.side-menu__wrapper {
	display: flex;
	flex-direction: column;
	width: 30%;
	height: 100%;
	@media (max-width: 600px) {
		width: 35%;
	}
}
.toggleMenuIcon {
	width: 3%;
	background: #33a6fe4e;
	height: 3%;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.237);
	cursor: pointer;
	transition: 0.3s linear;
	&:hover {
		box-shadow: 0 6px 6px rgba(0, 0, 0, 0.748);
	}
}
</style>
