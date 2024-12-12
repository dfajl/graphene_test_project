<template>
	<div class="user-card">
		<div class="user-card__left">
			<img :src="props.userData.avatar" alt="User Photo" class="user-card__image" />
		</div>
		<div class="user-card__right">
			<h2 class="user-card__name">{{ userName }}</h2>
			<p class="user-card__email">{{ props.userData.email }}</p>
			<UIPointsCounter v-model="pointsAmount" />

			<UIInput
				v-model="userDescription"
				class="user-card__textarea"
				:placeholder="'Edit description'"
				:tag="'textarea'"
			/>
			<UIButton class="font-size" :disabled="!userDescription" @click="saveToLocalStorage">Save</UIButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';
import UIPointsCounter from '@/components/UI/UIPointsCounter.vue';
import { ModifiedUser } from '@/stores/mainStore';
import { useMainStore } from '@/stores/mainStore';

const mainStore = useMainStore();

const props = defineProps<{
	userData: ModifiedUser;
}>();

const userName = computed(() => {
	return `${props.userData.first_name} ${props.userData.last_name}`;
});
const userDescription = ref(props.userData.description);
const pointsAmount = ref(props.userData.points);

// меняем данные в карточке при новом юзере
watch(
	() => props.userData,
	(newV) => {
		userDescription.value = newV.description;
		pointsAmount.value = newV.points;
	},
);

const saveToLocalStorage = () => {
	const data = {
		description: userDescription.value,
		points: pointsAmount.value,
	};
	localStorage.setItem(`${userName.value}`, JSON.stringify(data));
	mainStore.updateUserList({ ...data, id: props.userData.id });
	alert('Data saved!');
};
</script>

<style scoped lang="scss">
.user-card {
	display: flex;
	flex-wrap: wrap;
	margin: 0 auto;
	border: 1px solid #ccc;
	border-radius: 10px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 40%;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-30%, -50%);

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
		width: 70%;
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
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	&__email {
		font-size: 1.2rem;
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

	@media (max-width: 1000px) {
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
			font-size: 1rem;
		}

		.user-card__email {
			font-size: 0.9rem;
		}

		.user-card__textarea {
			height: 80px;
			width: 50%;
			margin: 0 auto;
			margin-bottom: 10px;
			font-size: 0.7rem;
		}
	}

	@media (max-width: 768px) {
		.user-card {
			flex-direction: column;
			left: 80%;
		}

		.user-card__left,
		.user-card__right {
			flex: 1 1 100%;
		}

		.user-card__image {
			max-width: 150px;
		}

		.user-card__name {
			font-size: 1rem;
		}

		.user-card__email {
			font-size: 0.9rem;
			text-align: center;
		}

		.user-card__textarea {
			height: 80px;
			width: 50%;
			margin: 0 auto;
			margin-bottom: 10px;
			font-size: 0.7rem;
		}
	}

	@media (max-width: 550px) {
		.user-card__name {
			font-size: 1rem;
		}

		.user-card__email {
			font-size: 0.8rem;
		}

		.user-card__textarea {
			height: 70px;
		}
		.font-size {
			font-size: 0.8rem;
			font-weight: 500;
		}
	}

	@media (max-width: 500px) {
		.user-card__name {
			font-size: 0.7rem;
		}

		.user-card__email {
			font-size: 0.7rem;
		}

		.user-card__textarea {
			width: 80%;
		}

		.font-size {
			font-size: 0.7rem;
			font-weight: 500;
		}
	}

	@media (max-width: 425px) {
		.user-card {
			width: 90%;
			top: auto;
			left: auto;
			transform: none;
			margin: 1rem auto;
		}

		.user-card__name {
			font-size: 0.9rem;
			text-align: center;
		}

		.user-card__email {
			font-size: 0.75rem;
			text-align: center;
			margin-bottom: 0.5rem;
		}

		.user-card__textarea {
			width: 100%;
			height: 50px;
			font-size: 0.8rem;
			margin: 0 auto 0.5rem;
		}

		.user-card__image {
			max-width: 80px;
			border-radius: 50%;
		}

		.font-size {
			font-size: 0.6rem;
		}
	}
}
</style>
