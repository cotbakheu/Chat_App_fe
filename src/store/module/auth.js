import Axios from 'axios'
// import Swal from 'sweetalert2'
import Alert from '../../helper/swal'
const auth = {
    namespaced: true,
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
            name: localStorage.getItem('name') || null,
            id: localStorage.getItem('id') || null
        }
    },
    getters: {
        getToken (state) {
            return state.token
        },
        getUserData (state) {
            return {
                name: state.name,
                id: state.id
            }
        }
    },
    mutations: {
        setState (state, payload) {
            state.token = payload.token
            state.access = payload.access
            state.name = payload.name
            state.uid = payload.uid
        },
        deleteState (state) {
            state.token = ''
            state.name = ''
            state.id = ''
        }
    },
    actions: {
        register (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`http://localhost:4000/api/register`, payload).then(() => {
                    resolve(true)
                }).catch((err) => {
                    reject(err.response.data.message)
                })
            })
        },
        login (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post(`http://localhost:4000/api/login`, payload).then((res) => {
                    if (res.data.code === 500) {
                        Alert.methods.toastDanger(res.data.message)
                    } else {
                        Alert.methods.toastSuccess(res.data.message)
                        localStorage.setItem('token', res.data.data.token)
                        localStorage.setItem('name', res.data.data.username)
                        localStorage.setItem('id', res.data.data.id)
                        context.commit('setState', {
                            token: res.data.data.token,
                            username: res.data.data.username,
                            id: res.data.data.id
                        })
                        resolve(true)
                    }
                }).catch((err) => {
                    if (err.response) {
                        reject(err.response.data.message)
                    } else {
                        reject('Something wrong')
                    }
                })
            })
        },
        logOut ({ commit }) {
            return new Promise((resolve) => {
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                localStorage.removeItem('id')
                commit('deleteState')
                resolve(true)
            })
        }
    }
}
export default auth