import {createRouter, createWebHistory} from "vue-router";
import GameCards from "../components/GameCards.vue";
import UserSelect from "../components/UserSelect.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "GameCards",
            component: GameCards
        },
        {
            path: "/select",
            name: "Select",
            component: UserSelect
        }
        ],
})

export default router;