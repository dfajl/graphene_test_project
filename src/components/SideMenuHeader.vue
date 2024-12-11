<template>
	<div class="side-menu-header-wrapper">
		<div class="side-menu-header">
			<div class="side-menu-header__btns">
				<UIButton class="side-menu-header__btn" @click="emitListView" data-view="client"> Clients </UIButton>
				<UIButton data-view="rating" class="side-menu-header__btn" @click="emitListView">Rating</UIButton>
			</div>
			<div class="side-menu-header__input">
				<UIInput placeholder="Searching for clients" v-model="searchingModel" />
			</div>
		</div>
		<div class="toggleMenuIcon">
			<img @click="handleClick" src="@/assets/icons/ArrowLeftIcon.svg" alt="Arrow Icon" class="arrow-icon" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';
import { useMainStore } from '@/stores/mainStore';

const { isSideMenuVisible, updateSideMenuVisible } = inject('sideMenu', {
	isSideMenuVisible: null,
	updateSideMenuVisible: (value: boolean) => {
		throw new Error('updateSideMenuVisible not provided');
	},
});

const handleClick = () => {
	updateSideMenuVisible(!isSideMenuVisible);
};

const mainStore = useMainStore();

const emit = defineEmits<{
	(event: 'list-view-selected', view: string): void;
}>();

const emitListView = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	emit('list-view-selected', target.dataset.view);
};

const searchingModel = ref('');

watch(searchingModel, (value) => {
	mainStore.setSearchingModel(value);
});
</script>

<style scoped lang="scss">
.side-menu-header-wrapper {
	display: flex;
	width: 110%;
	align-items: self-start;
	justify-content: space-between;

	.side-menu-header {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #33a6fe4e;
		&__btns {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;
		}
		&__btn {
			margin: 0;
			font-weight: 500;
			width: 47%;
			color: black;
			background: #fff;
			transition: 0.2s linear;
			&:hover {
				background: #33a6fe00;
			}
		}
	}
	.toggleMenuIcon {
		width: 10%;
		background: #33a6fe4e;
		height: 10%;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.237);
		cursor: pointer;
		transition: 0.3s linear;
		&:hover {
			box-shadow: 0 6px 6px rgba(0, 0, 0, 0.748);
		}
	}
}
</style>
