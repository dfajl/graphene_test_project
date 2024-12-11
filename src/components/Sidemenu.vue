<template>
	<div class="side-menu__wrapper" v-if="isSideMenuVisible">
		<SideMenuHeader @list-view-selected="handleListViewSelected" />
		<div class="user-list" ref="userListContainer">
			<div class="user-list__item" v-for="user in usersForRender" :key="user.id" @click="onUserClick(user.id)">
				<div class="user-list__item__left">
					<img :src="user.avatar" alt="User Photo" class="image" v-if="listView === 'client'" />
					<span v-else-if="listView === 'rating'" class="digit">{{ user.points }}</span>
					<span class="name">{{ user.first_name }} {{ user.last_name }}</span>
				</div>
				<div class="user-list__item__right">
					<img src="@/assets/icons/ArrowRightIcon.svg" alt="Arrow Icon" class="arrow-icon" />
				</div>
			</div>
		</div>
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

const isSideMenuVisible = ref(true);
function updateSideMenuVisible(value: boolean) {
	isSideMenuVisible.value = value;
}
provide('sideMenu', { isSideMenuVisible, updateSideMenuVisible });

const props = defineProps<{
	filteredSortedByNameUsers: ModifiedUser[];
	filteredSortedByRatingUsers: ModifiedUser[];
}>();

const userListContainer = ref(null);
const userListContainerBtn = ref(null);

const usersForRender = computed(() => {
	if (listView.value === 'client') {
		return props.filteredSortedByNameUsers;
	} else {
		return props.filteredSortedByRatingUsers;
	}
});

const emit = defineEmits<{
	(event: 'user-selected', userId: number): void;
}>();
const onUserClick = (userId: number) => {
	emit('user-selected', userId);
};

const handleListViewSelected = (view: string) => {
	listView.value = view;
};
const listView = ref('client');
</script>

<style scoped lang="scss">
.side-menu__wrapper {
	display: flex;
	flex-direction: column;
	width: 30%;
	height: 100%;
	.user-list {
		display: flex;
		flex-direction: column;
		background: #fff;

		&__item {
			padding-left: 1rem;
			padding-right: 1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 0.5rem;
			padding-top: 0.5rem;
			transition: 0.2s linear;
			width: 100%;
			&:not(:last-of-type) {
				border-bottom: 1px solid #ccc;
			}
			&:hover {
				cursor: pointer;
				background: rgba(114, 178, 250, 0.381);
			}
			&__left {
				flex: 1;
				display: flex;
				align-items: center;
				.image {
					width: 12%;
					border-radius: 40%;
					margin-right: 1rem;
				}
				.digit {
					font-size: 1.5rem;
					width: 12%;
					margin-right: 1rem;
				}
				.name {
					font-size: 0.8rem;
					margin-left: 0;
				}
			}
			&__right {
				margin-left: auto;
				.arrow-icon {
					height: 1.2rem;
				}
			}
		}
		.update-button {
			margin-top: 1rem;
			width: 95%;
			height: 3rem;
			margin-bottom: 1rem !important;
		}
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
