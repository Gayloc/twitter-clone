import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    if (to.path !== '/login' && to.path !== '/register' && to.path !== '/main' && to.path !== '/' && !userStore.Token) {
        ElMessage.error('Please login first');
        return navigateTo('/login');
    }
});