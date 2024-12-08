<template>
	<div class="user-card">
		<div class="user-card__left">
			<img :src="props.userInfo.avatar" alt="User Photo" class="user-card__image" />
		</div>
		<div class="user-card__right">
			<h2 class="user-card__name">{{ userName }}</h2>
			<p class="user-card__email">{{ props.userInfo.email }}</p>
			<UIPointsCounter v-model="pointsAmount" />

			<UIInput
				v-model="userDescription"
				class="user-card__textarea"
				:placeholder="'Edit description'"
				:tag="'textarea'"
			/>
			<UIButton :disabled="!userDescription" @click="saveToLocalStorage">Save</UIButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { User } from '@/types/UserData';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';
import UIPointsCounter from '@/components/UI/UIPointsCounter.vue';

const props = defineProps<{
	userInfo: User;
}>();

const userName = computed(() => {
	return `${props.userInfo.first_name} ${props.userInfo.last_name}`;
});
const userDescription = ref('');
const pointsAmount = ref(0);

const saveToLocalStorage = () => {
	const data = {
		description: userDescription.value,
		points: pointsAmount.value,
	};
	localStorage.setItem(`${userName.value}`, JSON.stringify(data));
};
</script>

<style scoped lang="scss">
.user-card {
	display: flex;
	flex-wrap: wrap;
	margin: 2rem;
	margin-right: 15rem;
	border: 1px solid #ccc;
	border-radius: 10px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 40%;

	&__left {
		flex: 1 1 30%;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__right {
		flex: 2 1 65%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		h2,
		p {
			text-align: center;
		}
	}

	&__image {
		width: 100%;
		max-width: 200px;
		height: auto;
		border-radius: 5%;
		object-fit: cover;
	}

	&__name {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	&__email {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: #666;
	}

	&__textarea {
		width: 100%;
		height: 100px;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		resize: none;
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.user-card {
			flex-direction: column;
		}

		.user-card__left,
		.user-card__right {
			flex: 1 1 100%;
		}

		.user-card__image {
			max-width: 150px;
		}

		.user-card__name {
			font-size: 1.25rem;
		}

		.user-card__email {
			font-size: 0.9rem;
		}

		.user-card__textarea {
			height: 80px;
			width: 50%;
			margin: 0 auto;
			margin-bottom: 10px;
		}
	}

	@media (max-width: 480px) {
		.user-card__name {
			font-size: 1.1rem;
		}

		.user-card__email {
			font-size: 0.85rem;
		}

		.user-card__textarea {
			height: 70px;
		}
	}
}
</style>
