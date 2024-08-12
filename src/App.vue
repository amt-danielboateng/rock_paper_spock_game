<template>
  <div class="relative flex flex-col items-center justify-between mt-5 h-[100vh]">
    <div class="flex justify-between w-1/2 border px-4 py-2 rounded-lg text-xl">
      <ul>
        <li v-for="choice of gameChoices" :key="choice">{{ choice }}</li>
      </ul>
      <div class="flex flex-col items-center bg-white text-[#2a46c0] px-3 py-1 rounded-lg">
        <span class="text-[20px]">{{ scoreTitle }}</span>
        <p class="text-[63px] text-[#3b4363] pt-2">{{ score }}</p>
      </div>
    </div>
    <router-view></router-view>
    <Modal :isOpen="isDialogOpen" @close="isDialogOpen = false" class="absolute bg-white"/>
    <button
        class="absolute right-0 bottom-5 border py-1 px-3 rounded-lg tracking-wide mr-7"
        @click="openDialog"
      >
        RULES
      </button>
  </div>
</template>

<script setup lang="ts">
import { markRaw, ref, Ref } from "vue";
import { useGameStore } from './store/GameStore';
import { computed } from 'vue';
import ModalSvg from "../src/assets/images/ModalSvg.vue";

const isDialogOpen = ref(false); 

const openDialog = () => {
  isDialogOpen.value = !isDialogOpen.value;
};

const gameStore = useGameStore();
const score = computed(() => gameStore.getScore);

const Modal = markRaw(ModalSvg);

const gameChoices: Ref<string[]> = ref(["rock", "paper", "scissors"]);
const scoreTitle: Ref<string> = ref("score");
</script>

<style scoped></style>