<template>
	<div class="user-list" ref="userListContainer">
		<div class="user-list__item" v-for="user in usersForRender" :key="user.id" @click="onUserClick(user.id)">
			<div class="user-list__item__left">
				<img :src="user.avatar" alt="User Photo" class="image" v-if="props.listView === 'client'" />
				<span v-else-if="listView === 'rating'" class="digit">{{ user.points }}</span>
				<span class="name">{{ user.first_name }} {{ user.last_name }}</span>
			</div>
			<div class="user-list__item__right">
				<img src="@/assets/icons/ArrowRightIcon.svg" alt="Arrow Icon" class="arrow-icon" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, withDefaults, Ref } from 'vue';
import { ModifiedUser } from '@/stores/mainStore';

const props = withDefaults(
	defineProps<{
		usersForRender: ModifiedUser[];
		listView: string;
	}>(),
	{
		listView: 'client',
	},
);

const checkedUserId = inject<Ref<number>>('checkedUserId');

const userListContainer = ref(null);

const onUserClick = (userId: number) => {
	checkedUserId.value = userId;
};
</script>

<style scoped lang="scss">
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
				@media (max-width: 768px) {
					width: 30%;
				}
			}
			.digit {
				font-size: 1.5rem;
				width: 12%;
				margin-right: 1rem;
				@media (max-width: 768px) {
					font-size: 1rem;
				}
			}
			.name {
				font-size: 0.8rem;
				margin-left: 0;
				@media (max-width: 768px) {
					font-size: 0.7rem;
				}
				@media (max-width: 600px) {
					font-size: 0.6rem;
				}
			}
		}
		&__right {
			margin-left: auto;
			.arrow-icon {
				height: 1.2rem;
				@media (max-width: 768px) {
					display: none;
				}
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
</style>
