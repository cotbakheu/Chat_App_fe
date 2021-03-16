import Axios from 'axios'

const auth = {
    namespaced: true,
    state: () => {
        return {
            userData: {},
        }
    },
    getters: {
        getToken (state) {
            return state.token
        },
        getUserData (state) {
            return state.userData
        }
    },
    mutations: {
        setUserData (state, payload) {
            // console.log(payload)
            state.userData = payload
        },
        deleteState (state) {
            state.userData = {}
        }
    },
    actions: {
        register (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`${process.env.VUE_APP_SERVER_API}/register`, payload).then((res) => {
                    resolve(res.data)
                }).catch((err) => {
                    reject(err.response.data.message)
                })
            })
        },
        login (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`${process.env.VUE_APP_SERVER_API}/login`, payload).then((res) => {
                    // console.log(res.data)
                    if (res.data.code === 500) {
                        resolve(res.data)
                    } else {
                        localStorage.setItem('token', res.data.data.token)
                        localStorage.setItem('username', res.data.data.username)
                        localStorage.setItem('id', res.data.data.id)
                        localStorage.setItem('name', res.data.data.id)
                        localStorage.setItem('roomId', res.data.data.room_id)
                        context.commit('setUserData', res.data.data)
                        resolve(res.data)
                    }
                }).catch(() => {
                    reject('Something wrong')
                })
            })
        },
        logOut ({ commit }) {
            return new Promise((resolve) => {
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                localStorage.removeItem('id')
                localStorage.removeItem('username')
                localStorage.removeItem('roomId')
                commit('deleteState')
                resolve(true)
            })
        }
    },
}
export default auth