import axios from 'axios'
import actionHandler from '../actionHandler'
import router from '@/router'

const initialUserState = () => (JSON.parse(localStorage.getItem('user')) ?? {
    _id: '',
    name: '',
    email: '',
    isAdmin: false,
    createdAt: '',
    updatedAt: '',
    token: null
})

const state = {
    loggedUser: initialUserState(),
    userDetails: {},

    users: []
}

const getters = {
    getLoggedUser: state => state.loggedUser,
    getUserDetails: state => state.userDetails,
    
    getAllUsers: state => state.users
}

const actions = {
    /* 
     * @desc        Authenticate user & get token
     * @access      Public
     */
    loginUser: actionHandler(async ({ commit }, { email, password }) => {
        const { data } = await axios.post('/api/users/login', { email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        commit('setUser', { user: data.data, statePiece: 'loggedUser' })
    }),
    
    /* 
     * @desc        Sign out logged user
     * @access      Private
     */
    logoutUser({ commit }) {
        localStorage.removeItem('user')
        commit('resetLoggedUser')

        router.push({ name: 'Login', query: { redirect: router.currentRoute.value.fullPath.slice(1) } })
    },

    /* 
     * @desc        Register a new user
     * @access      Public
     */
    registerUser: actionHandler(async ({ commit }, { name, email, password }) => {
        const { data } = await axios.post('/api/users', { name, email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        commit('setUser', { user: data.data, statePiece: 'loggedUser' })
    }),

    /* 
     * @desc        Get User by id or the logged in
     * @access      Private || Admin
     */
    fetchUserDetails: actionHandler(async ({ commit, state }, user = 'profile') => {
        commit('resetUserDetails')
        
        const { data } = await axios.get(`/api/users/${user}`, {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })
        
        commit('setUser', { user: data.data, statePiece: 'userDetails' })
    }),
    
    /* 
     * @desc        Update logged in user data
     * @access      Private
     */
    updateUserProfile: actionHandler(async ({ commit, state }, { name, email, password }) => {
        const { data } = await axios.put('/api/users/profile',
            { name, email, password },
            { headers: { Authorization: `Bearer ${state.loggedUser.token}` }}
        )

        localStorage.setItem('user', JSON.stringify(data.data))
        commit('setUser', { user: data.data, statePiece: 'loggedUser' })
        
        commit('resetUserDetails')
        commit('setUser', { user: data.data, statePiece: 'userDetails' })
    }),

    /* 
     * @desc        Get all registered users
     * @access      Admin
     */
    fetchAllUsers: actionHandler(async ({ commit, state }) => {
        commit('resetAllUsers')
        
        const { data } = await axios.get('/api/users', {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })

        commit('setAllUsers', data.data)
    }),
    
    /* 
     * @desc        Delete user by id
     * @access      Admin
     */
    deleteUser: actionHandler(async ({ dispatch, state }, userId ) => {
        await axios.delete(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })

        dispatch('fetchAllUsers')
    })
}

const mutations = {
    resetLoggedUser: state => state.loggedUser = initialUserState(),
    resetUserDetails: state => state.userDetails = {},
    
    setUser: (state, { user, statePiece }) => Object.keys(user).forEach(key => state[statePiece][key] = user[key]),

    resetAllUsers: state => state.users = [],
    setAllUsers: (state, users) => state.users = users
}

export default {
    state,
    getters,
    actions,
    mutations
}
