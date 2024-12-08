<template>
	<div class="user-list" ref="userListContainer">
		<div class="user-list__item" v-for="user in allUsers" :key="user.id" @click="onUserClick(user.id)">
			<div class="user-list__item__left">
				<img :src="user.avatar" alt="User Photo" class="image" />
				<span class="name">{{ user.first_name }} {{ user.last_name }}</span>
			</div>
			<div class="user-list__item__right">
				<img src="@/assets/icons/ArrowRightIcon.svg" alt="Arrow Icon" class="arrow-icon" />
			</div>
		</div>
		<UIButton class="update-button" :style="buttonStyle" ref="userListContainerBtn">Update list</UIButton>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { User } from '@/types/UserData';
import UIButton from '@/components/UI/UIButton.vue';

const props = defineProps<{
	allUsers: User[];
}>();

const userListContainer = ref(null);
const userListContainerBtn = ref(null);

// высота блока списка юзеров с учетом margin-bottom
const userItemsSumHeight = computed(() => {
	const summaryMargins = props.allUsers.length * 16;
	const containerHeight = userListContainer.value?.offsetHeight + summaryMargins;
	const buttonHeight = userListContainerBtn.value?.UIButton.offsetHeight;

	return containerHeight - buttonHeight;
});

// Вычисляем отступ для кнопки
const buttonStyle = computed(() => {
	const windowHeight = document.documentElement.clientHeight;
	const buttonHeight = userListContainerBtn.value?.UIButton.offsetHeight;

	const offset = windowHeight - userItemsSumHeight.value - buttonHeight;

	return { marginTop: `${offset}px` };
});

const emit = defineEmits<{
	(event: 'user-selected', userId: number): void;
}>();
const onUserClick = (userId: number) => {
	emit('user-selected', userId);
};
</script>

<style scoped lang="scss">
.user-list {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 30%;
	background: #fff;

	&__item {
		padding-left: 1rem;
		padding-right: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		transition: 0.2s linear;
		width: 100%;

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
		width: 95%;
		height: 3rem;
		margin-bottom: 1rem !important;
	}
}
</style>
