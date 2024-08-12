<template>
  <div class="cards_background">
    <div class="flex flex-col justify-between">
      <div
        v-for="card of gameCards"
        :key="card"
        class="relative flex items-center justify-center cursor-pointer rounded-full"
      >
        <div
          class="before:content-[ ] shadow-inner inset-0 bg-white rounded-full w-32 h-32 flex items-center justify-center z-1 m-1 hover:bg-white"
          :class="card.text"
          @click="setGameId(card.id)"
        >
          <component
            class="z-2 bg-white rounded-full w-[80%] h-[80%] p-6 hover:bg-[#999999]"
            :is="card.component"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PaperSvg from "../assets/images/PaperSvg.vue";
import RockSvg from "../assets/images/RockSvg.vue";
import ScissorsSvg from "../assets/images/ScissorsSvg.vue";
import { ref, markRaw } from "vue";
import { useGameStore } from "../store/GameStore";
import { useRouter } from 'vue-router';

const router = useRouter();
const gameStore = useGameStore();

const gameCards = ref([
  { component: markRaw(PaperSvg), text: "paper", id: "paper" },
  { component: markRaw(RockSvg), text: "rock", id: "rock" },
  { component: markRaw(ScissorsSvg), text: "scissor", id: "scissor" },
]);

const setGameId = (id: string) => {
  gameStore.setId(id);
  router.push('/select');
};
</script>

<style scoped>
.cards_background {
  background: center / contain no-repeat
    url("../src/assets/images/bg-triangle.svg");
  background-size: 340px;
  width: 50%;
  height: 70%;
  position: relative;
}

.paper {
  background: linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%));
  box-shadow: 0px 6px 0px 0px hsl(229, 62%, 34%);
  position: absolute;
  top: 0;
  left: 20%;
}

.paper:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}

.rock {
  background: linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%));
  box-shadow: 0px 6px 0px 0px hsl(343, 70%, 30%);
  position: absolute;
  top: 210px;
  left: 39%;
}

.rock:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}

.scissor {
  background: linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%));
  box-shadow: 0px 6px 0px 0px hsl(28, 75%, 44%);
  position: absolute;
  top: 0;
  left: 57%;
}

.scissor:hover {
  background: rgba(151, 151, 151);
  box-shadow: none;
}

@media only screen and (min-width: 1366px) {
  .paper {
    top: 100px;
    left: 260px;
  }

  .scissor {
    top: 100px;
  }

  .rock {
    top: 350px;
    left: 400px;
  }
}
</style>
