import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import PaperSvg from '../assets/images/PaperSvg.vue';
import RockSvg from '../assets/images/RockSvg.vue';
import ScissorsSvg from '../assets/images/ScissorsSvg.vue';
import { CardObject, GameState } from '../services/games';


export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    id: '',
    userSelectedCard: null,
    housePicked: null,
    score: 0,
  }),
  getters: {
    getUserSelectedCard: (state) => state.userSelectedCard,
    getHousePicked: (state) => state.housePicked,
    getScore: (state) => state.score,
  },
  actions: {
    setId(id: string) {
      this.id = id;
      this.setUserSelectedCard(id);
      this.setHousePicked();
    },
    setUserSelectedCard(id: string) {
      const cards: CardObject[] = [
        { component: markRaw(PaperSvg), text: 'paper', id: 'paper' },
        { component: markRaw(RockSvg), text: 'rock', id: 'rock' },
        { component: markRaw(ScissorsSvg), text: 'scissor', id: 'scissor' },
      ];
      this.userSelectedCard = cards.find((card) => card.id === id) || null;
    },
    setHousePicked() {
      const options: string[] = ['paper', 'rock', 'scissor'];
      const randomIndex = Math.floor(Math.random() * options.length);
      this.housePicked = this.getCardObject(options[randomIndex]);
    },
    getCardObject(id: string): CardObject | null {
      const cards: CardObject[] = [
        { component: markRaw(PaperSvg), text: 'paper', id: 'paper' },
        { component: markRaw(RockSvg), text: 'rock', id: 'rock' },
        { component: markRaw(ScissorsSvg), text: 'scissor', id: 'scissor' },
      ];
      return cards.find((card) => card.id === id) || null;
    },
    updateScore(result: 'win' | 'lose' | 'draw') {
        switch (result) {
          case 'win':
            this.score++;
            break;
          case 'lose':
            this.score--;
            break;
          case 'draw':
            break;
        }
  },
 }
});