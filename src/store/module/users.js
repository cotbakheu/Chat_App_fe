import axios from 'axios'

const users = {
    namespaced: true,
    state() {
        return {
            getDetailUser: {},
            allUsers: [],
            detailTarget: {}
        }
    },
    mutations: {
        mutationSetUserDetail(state, payload) {
            state.getDetailUser = payload
            // console.log(state.getDetailUser)
        },
        mutationSetTargetDetail(state, payload) {
            state.detailTarget = payload
        },
        setAllUsers(state, payload) {
            state.allUsers = payload 
        }
    },
    actions: {
        actDetailUser (context, id) {
            return new Promise ((resolve, reject)=> {
                axios.get(`${process.env.VUE_APP_SERVER_API}/user/${id}`, {headers: { token: localStorage.getItem('token')}}).then((response)=>{
                    // console.log(response.data)
                    context.commit('mutationSetUserDetail', response.data.data[0])
                    resolve(response.data)
                }).catch((err)=>{
                    reject(err)
                    // console.log(err)
                })
            })
        },
        actTargetUser (context, id) {
            return new Promise ((resolve, reject)=> {
                axios.get(`${process.env.VUE_APP_SERVER_API}/user/${id}`, {headers: { token: localStorage.getItem('token')}}).then((response)=>{
                    // console.log(response.data)
                    context.commit('mutationSetTargetDetail', response.data.data[0])
                    resolve(response.data)
                }).catch((err)=>{
                    reject(err)
                    // console.log(err)
                })
            })
        },
        actionUpdateUser (context, data) {
            return new Promise ((resolve, reject)=> {
                axios.patch(`${process.env.VUE_APP_SERVER_API}/user/${localStorage.getItem('id')}`, data, {headers: { token: localStorage.getItem('token')}}).then((response)=>{
                    // console.log(response)
                    resolve(response.data)
                }).catch((err)=>{
                    console.loh(err)
                    reject(err)
                })
            })
        },
        actDeletePhoto () {
            return new Promise ((resolve, reject)=> {
                axios.get(`${process.env.VUE_APP_SERVER_API}/user/delete_photo/${localStorage.getItem('id')}`, {headers: { token: localStorage.getItem('token')}}).then((response)=>{
                    // console.log(response.data)
                    resolve(response.data)
                }).catch((err)=>{
                    reject(err)
                    // console.log(err)
                })
            })
        },
        actAllUsers (context, data) {
            return new Promise ((resolve, reject)=> {
                axios.post(`${process.env.VUE_APP_SERVER_API}/allUser`, data).then((response)=>{
                    // console.log(response.data)
                    context.commit('setAllUsers', response.data.data)
                    resolve(response.data)
                }).catch((err)=>{
                    reject(err)
                    // console.log(err)
                })
            })
        },
    },
    getters: {
        detailUser(state) {
            // console.log(state.getDetailUser)
            return state.getDetailUser
        },
        getAllUsers(state) {
            return state.allUsers
        },
        getDetailTarget(state) {
            return state.detailTarget
        }
    }
}

export default users;