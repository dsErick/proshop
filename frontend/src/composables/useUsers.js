import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useUsers() {
    const store = useStore()
    
    const user = computed(() => store.getters['getUser'])
    const loginUser = user => store.dispatch('loginUser', user)
    const logoutUser = () => store.dispatch('logoutUser')

    return {
        user,
        loginUser,
        logoutUser,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    } 
}
