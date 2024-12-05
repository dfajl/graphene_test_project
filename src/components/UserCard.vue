<template>
	<div class="user-card">
		<div class="user-card__left">
			<img :src="userImage" alt="User Photo" class="user-card__image" />
		</div>
		<div class="user-card__right">
			<h2 class="user-card__name">{{ userName }}</h2>
			<p class="user-card__email">{{ userEmail }}</p>
			<textarea v-model="userDescription" class="user-card__textarea" placeholder="Edit description"></textarea>
			<UIButton>Save</UIButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UIButton from '@/components/UI/UIButton.vue';

const userImage = ref('https://via.placeholder.com/150'); // Пример изображения
const userName = ref('John Doe');
const userEmail = ref('john.doe@example.com');
const userDescription = ref('');
</script>

<style scoped lang="scss">
.user-card {
	display: flex;
	flex-wrap: wrap; /* Разделяем на строки для адаптивности */
	margin: 2rem;
	border: 1px solid #ccc;
	border-radius: 10px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&__left {
		flex: 1 1 30%; /* Фиксированная ширина для изображения */
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__right {
		flex: 2 1 65%; /* Оставшееся пространство для правой части карточки */
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	&__image {
		width: 100%;
		max-width: 120px; /* Ограничение максимального размера изображения */
		height: auto;
		border-radius: 50%;
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

	&__button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		background-color: #4caf50;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #45a049;
		}
	}

	/* Адаптивность */
	@media (max-width: 768px) {
		.user-card {
			flex-direction: column;
		}

		.user-card__left,
		.user-card__right {
			flex: 1 1 100%; /* На маленьких экранах элементы занимают 100% ширины */
		}

		.user-card__image {
			max-width: 80px; /* Уменьшаем изображение для мобильных устройств */
		}

		.user-card__name {
			font-size: 1.25rem;
		}

		.user-card__email {
			font-size: 0.9rem;
		}

		.user-card__textarea {
			height: 80px; /* Уменьшаем высоту textarea для мобильных устройств */
		}

		.user-card__button {
			width: 100%;
			font-size: 1.1rem; /* Увеличиваем размер кнопки на мобильных устройствах */
		}
	}

	@media (max-width: 480px) {
		.user-card__name {
			font-size: 1.1rem; /* Еще меньше шрифт на самых маленьких экранах */
		}

		.user-card__email {
			font-size: 0.85rem;
		}

		.user-card__textarea {
			height: 70px;
		}

		.user-card__button {
			font-size: 1rem; /* Более компактная кнопка */
		}
	}
}
</style>
