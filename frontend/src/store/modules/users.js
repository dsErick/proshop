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
    })
}

const mutations = {
    resetLoggedUser: state => state.loggedUser = initialUserState(),
    resetUserDetails: state => state.userDetails = {},
    
    setUser: (state, { user, statePiece }) => Object.keys(user).forEach(key => state[statePiece][key] = user[key])
    // setLoggedUser: (state, user) => Object.keys(user).forEach(key => state.loggedUser[key] = user[key]),
    // setUserDetails: (state, user) => Object.keys(user).forEach(key => state.userDetails[key] = user[key]),
}

export default {
    state,
    getters,
    actions,
    mutations
}
