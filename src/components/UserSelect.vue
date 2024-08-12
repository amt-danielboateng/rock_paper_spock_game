<template>
  <div class="w-[50%] mb-8">
    <div class="flex justify-between">
      <div class="flex flex-col items-center justify-center">
        <p class="pb-8">YOU PICKED</p>
        <div
          v-if="userSelectedCard"
          class="before:content-[ ] shadow-inner inset-0 bg-white rounded-full w-48 h-48 flex items-center justify-center z-1 m-1 hover:bg-white cursor-pointer"
          :class="userSelectedCard.text"
        >
          <component
            :is="userSelectedCard.component"
            class="z-2 bg-white rounded-full w-[80%] h-[80%] p-12 hover:bg-[#999999]"
          />
        </div>
      </div>
      <div class="flex flex-col items-center justify-center mt-8">
        <p class="text-2xl font-bold mb-4">{{ winStatus }}</p>
        <button
          class="bg-white text-slate-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          @click="playAgain"
        >
          Play Again
        </button>
      </div>
      <div class="flex flex-col items-center justify-center">
        <p class="pb-8">THE HOUSE PICKED</p>
        <div
          v-if="housePicked"
          class="before:content-[ ] shadow-inner inset-0 bg-white rounded-full w-48 h-48 flex items-center justify-center z-1 m-1 hover:bg-white cursor-pointer"
          :class="housePicked.text"
        >
          <component
            :is="housePicked.component"
            class="z-2 bg-white rounded-full w-[80%] h-[80%] p-12 hover:bg-[#999999]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "../store/GameStore";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const gameStore = useGameStore();
const router = useRouter();

const userSelectedCard = computed(() => gameStore.getUserSelectedCard);
const housePicked = computed(() => gameStore.getHousePicked);

const winStatus = ref("");

function determineWinStatus() {
  const userChoice = gameStore.getUserSelectedCard?.id;
  const houseChoice = gameStore.getHousePicked?.id;

  if (!userChoice || !houseChoice) {
    winStatus.value = "";
    return;
  }

  if (userChoice === houseChoice) {
    winStatus.value = "You Drew!";
    gameStore.updateScore("draw");
  } else if (
    (userChoice === "paper" && houseChoice === "rock") ||
    (userChoice === "rock" && houseChoice === "scissor") ||
    (userChoice === "scissor" && houseChoice === "paper")
  ) {
    winStatus.value = "You Win!";
    gameStore.updateScore("win");
  } else {
    winStatus.value = "You Lose!";
    gameStore.updateScore("lose");
  }
}

function playAgain() {
  router.push("/");
}

watch(
  () => [gameStore.getUserSelectedCard, gameStore.getHousePicked],
  determineWinStatus
);
determineWinStatus();
</script>

<style scoped>
.paper {
  background: linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%));
  box-shadow: 0px 6px 0px 0px hsl(229, 62%, 34%);
}

.paper:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}

.rock {
  background: linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%));
  box-shadow: 0px 6px 0px 0px hsl(343, 70%, 30%);
}

.rock:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}

.scissor {
  background: linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%));
  box-shadow: 0px 6px 0px 0px hsl(28, 75%, 44%);
}

.scissor:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}
</style>
