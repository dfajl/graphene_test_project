<template>
	<div class="side-menu">
		<div class="side-menu__btns">
			<UIButton class="side-menu__btn" @click="emitListView" data-view="client"> Clients </UIButton>
			<UIButton data-view="rating" class="side-menu__btn" @click="emitListView">Rating</UIButton>
		</div>
		<div class="side-menu__input">
			<UIInput />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { User } from '@/types/UserData';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';

const props = defineProps<{
	//allUsers: User[];
}>();

const emit = defineEmits<{
	(event: 'list-view-selected', view: string): void;
}>();

const emitListView = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	emit('list-view-selected', target.dataset.view);
};
</script>

<style scoped lang="scss">
.side-menu {
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
</style>
