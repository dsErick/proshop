import axios from 'axios'
import actionHandler from '../actionHandler'

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
    userDetails: {}
}

const getters = {
    getLoggedUser: state => state.loggedUser,
    getUserDetails: state => state.userDetails
}

const actions = {
    loginUser: actionHandler(async ({ commit }, { email, password }) => {
        const { data } = await axios.post('/api/users/login', { email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        
        commit('setLoggedUser', data.data)
        commit('utils/resetError', null, { root: true })
    }),
    logoutUser({ commit }) {
        localStorage.removeItem('user')
        commit('resetLoggedUser')
    },
    registerUser: actionHandler(async ({ commit }, { name, email, password }) => {
        const { data } = await axios.post('/api/users', { name, email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        
        commit('setLoggedUser', data.data)
        commit('utils/resetError', null, { root: true })
    }),

    fetchUserDetails: actionHandler(async ({ commit, state }, user = 'profile') => {
        const { data } = await axios.get(`/api/users/${user}`, {
            headers: { Authorization: `Bearer ${state.loggedUser.token}` }
        })
        
        commit('setUserDetails', data.data)
        commit('utils/resetError', null, { root: true })
    })
}

const mutations = {
    setLoggedUser: (state, newUser) => Object.keys(newUser).forEach(key => state.loggedUser[key] = newUser[key]),
    resetLoggedUser: state => state.loggedUser = initialUserState(),

    setUserDetails: (state, user) => Object.keys(user).forEach(key => state.userDetails[key] = user[key]),
    resetUserDetails: state => state.userDetails = {}
}

export default {
    state,
    getters,
    actions,
    mutations
}
