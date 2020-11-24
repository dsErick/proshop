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
    loggedUser: initialUserState()
}

const getters = {
    getLoggedUser: state => state.loggedUser
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
    })
}

const mutations = {
    setLoggedUser: (state, newUser) => Object.keys(newUser).forEach(key => state.loggedUser[key] = newUser[key]),
    resetLoggedUser: state => state.loggedUser = initialUserState()
}

export default {
    state,
    getters,
    actions,
    mutations
}
