<template>
	<div class="side-menu__wrapper">
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
			<UIButton class="update-button" ref="userListContainerBtn">Update list</UIButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ModifiedUser } from '@/stores/mainStore';
import UIButton from '@/components/UI/UIButton.vue';
import SideMenuHeader from '@/components/SideMenuHeader.vue';

const props = defineProps<{
	sortedByNameUsers: ModifiedUser[];
	sortedByRatingUsers: ModifiedUser[];
}>();

const userListContainer = ref(null);
const userListContainerBtn = ref(null);

const usersForRender = computed(() => {
	if (listView.value === 'client') {
		return props.sortedByNameUsers;
	} else {
		return props.sortedByRatingUsers;
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
</style>
