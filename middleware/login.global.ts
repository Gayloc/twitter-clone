import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    if (to.path !== '/login' && to.path !== '/register' && !userStore.Token) {
        ElMessage.error('Please login first');
        return navigateTo('/login');
    }
});