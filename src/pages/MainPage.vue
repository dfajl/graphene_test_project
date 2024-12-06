<template>
	<UserCard v-if="allUsers?.length" />
</template>

<script setup lang="ts">
import UserCard from '@/components/UserCard.vue';
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const { allUsers } = storeToRefs(mainStore);

mainStore.fetchUsers();
</script>

<style scoped lang="scss"></style>
