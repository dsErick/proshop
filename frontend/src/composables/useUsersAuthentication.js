import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default function useUsers() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const user = computed(() => store.getters['getLoggedUser'])
    
    const loginUser = user => store.dispatch('loginUser', user)
    const registerUser = user => {
        if (user.password !== user.confirmPassword) {
            store.commit('utils/setError', { message: 'The password confirmation must match' }, { root: true })
            return
        }
        
        store.dispatch('registerUser', user)
    }
    const logoutUser = () => store.dispatch('logoutUser')


    const redirect = route.query.redirect ?? ''
    const redirectWatch = () => watch(user.value, user => {
        if (user._id) router.push(`/${redirect}`)
    }, { immediate: true })
    
    return {
        user,
        loginUser,
        registerUser,
        logoutUser,
        redirect,
        redirectWatch,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    } 
}
