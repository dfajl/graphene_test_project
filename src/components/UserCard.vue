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
			<UIButton class="ui-button-font-size" :disabled="!userDescription" @click="saveToLocalStorage"
				>Save</UIButton
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';
import UIPointsCounter from '@/components/UI/UIPointsCounter.vue';
import { ModifiedUser } from '@/stores/mainStore';
import { useMainStore } from '@/stores/mainStore';

// внедряю функцию содания тостов из main.ts
const addToast = inject<(message: string, type: 'success' | 'error') => void>('addToast');

if (!addToast) {
	console.error('Не удалось инжектировать addToast.');
}

const triggerToast = () => {
	if (addToast) {
		addToast('Data saved!', 'success');
	}
};

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
	triggerToast();
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
	@media (max-width: 1000px) {
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 768px) {
		left: 60%;
	}
	@media (max-width: 425px) {
		width: 90%;
	}
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
		@media (max-width: 610px) {
			padding-right: 0rem;
			padding-left: 0rem;
		}
		.ui-button-font-size {
			@media (max-width: 580px) {
				font-size: 0.7rem;
			}
			@media (max-width: 520px) {
				font-size: 0.6rem;
				font-weight: 400;
			}
		}
	}

	&__image {
		width: 100%;
		max-width: 200px;
		height: auto;
		border-radius: 5%;
		object-fit: cover;
		@media (max-width: 1000px) {
			max-width: 150px;
		}
		@media (max-width: 768px) {
			max-width: 130px;
		}
	}

	&__name {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
		@media (max-width: 1000px) {
			font-size: 1rem;
		}
		@media (max-width: 768px) {
			font-size: 0.8rem;
		}
	}

	&__email {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		color: #666;
		@media (max-width: 1000px) {
			font-size: 0.9rem;
		}
		@media (max-width: 768px) {
			font-size: 0.8rem;
			display: block;
			width: 70%;
		}
		@media (max-width: 600px) {
			font-size: 0.6rem;
			display: block;
			text-align: left;
		}
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
		@media (max-width: 1000px) {
			height: 80px;
			width: 90%;
			margin: 0 auto;
			margin-bottom: 10px;
			font-size: 0.7rem;
		}
		@media (max-width: 768px) {
			height: 90px;
			width: 90%;
			margin: 0 auto;
			margin-bottom: 10px;
			font-size: 0.7rem;
		}
	}
}
</style>
