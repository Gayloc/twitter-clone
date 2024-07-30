export const myUtilityFunction = async () => {
    const response =
        await $fetch('/api/user/userInfo');
    return response;
};