import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default function useUsersDetails() {
    const store = useStore()

    const success = ref(false)
    const users = computed(() => store.getters['getAllUsers'])
    const userDetails = computed(() => store.getters['getUserDetails'])

    const fetchAllUsers = () => store.dispatch('fetchAllUsers')
    const fetchUserDetails = (user = 'profile') => store.dispatch('fetchUserDetails', user)

    const updateUserProfile = async user => {
        user.password !== user.confirmPassword
            ? store.commit('utils/setError', { message: 'The password confirmation must match' }, { root: true })
            : success.value = await store.dispatch('updateUserDetails', { user })
    }
    const updateUserDetails = async user => success.value = await store.dispatch('updateUserDetails', { user, route: user._id })

    const deleteUser = userId => {
        if (window.confirm(`Do you really want to remove the user ${userId}?`)) store.dispatch('deleteUser', userId)
    }

    return {
        success,
        users,
        userDetails,
        
        fetchAllUsers,
        fetchUserDetails,
        updateUserProfile,
        updateUserDetails,
        deleteUser,
        
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}