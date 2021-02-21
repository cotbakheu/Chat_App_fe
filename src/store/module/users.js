import axios from 'axios'

const users = {
  namespaced: true,
  actions: {
      register (context, data) {
          console.log(data)
          return new Promise((resolve, reject)=> {
              axios.post('http://localhost:4000/api/register', data).then((response)=>{
                console.log(response.data)
                resolve(response.data.message)
              }).catch(()=>{
                  reject('server error')
              })
          }) 
      },
      login (context, data) {
        return new Promise((resolve, reject)=> {
            axios.post('http://localhost:4000/api/login', data).then((res)=>{
                console.log(res)
                resolve(true)
            }).catch((err)=>{
                reject(err)
            })
        }) 
    },
  },
}

export default users;