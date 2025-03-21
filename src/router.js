import {createRouter, createWebHistory} from "vue-router";
import BarbecuePlannerPage from './components/BarbecuePlanner/BarbecuePlannerPage.vue'
const routes = [
{
    path: '/',
    name: 'BarbecuePlannerPage',
    component: BarbecuePlannerPage
},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;
