import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useUsers() {
    const store = useStore()
    
    const user = computed(() => store.getters['getUser'])
    const authUser = user => store.dispatch('loginUser', user)

    return {
        user,
        authUser,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    } 
}
