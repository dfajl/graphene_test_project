<template>
	<div class="main-wrapper">
		<UserCard v-if="allUsers?.length" v-for="user in allUsers" :user-info="user" />
	</div>
</template>

<script setup lang="ts">
import UserCard from '@/components/UserCard.vue';
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const { allUsers } = storeToRefs(mainStore);

mainStore.fetchUsers();
</script>

<style scoped lang="scss">
/* .main-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-around;
} */
</style>
