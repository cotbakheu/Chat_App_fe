<template>
  <div class="container py-5 d-flex justify-content-center align-items-center">
    <div
      class="col-md-4 col-12 shadow py-5 px-5"
      style="background: white; border-radius: 20px"
      id="login"
    >
      <div>
        <p
          style="
            text-align: center;
            color: #7e98df;
            font-weight: 500;
            font-size: 22px;
          "
        >
          Login
        </p>
      </div>
      <small>Hi, Wellcome back!</small>
      <form class="mt-3" @submit.prevent="onLogin()">
        <div class="form-group">
          <h5 for="exampleInputEmail1">Email</h5>
          <input
            type="email"
            class="form-control"
            placeholder="email@mail.com"
            id="exampleInputEmail1"
            v-model="form.email"
          />
        </div>
        <div class="form-group">
          <h5 for="exampleInputPassword1">Password</h5>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            id="exampleInputPassword1"
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn mainBtn w-100" style="color: white">
          Login
        </button>
      </form>
      <p class="mt-3" style="text-align: center">Login with</p>
      <button class="btn w-100 mainBtn" style="color: white">
        <i class="fab fa-google"></i> Google
      </button>
      <p class="mt-3 text-center" style="font-size: 12px">
        Dont have an account?
        <router-link style="color: #7e98df; font-style: none" to="/register"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {onTalkMixin} from '../helper/mixins'

export default {
  mixins: [onTalkMixin],
    data: () => {
        return {
            form: {
                email:'',
                password:''
            }
        }
    },
    methods: {
        ...mapActions({
          userLogin : 'auth/login',
          actDetailUser: 'users/actDetailUser'
        }),
        onLogin () {
          this.userLogin(this.form).then((response)=>{
            // console.log(response)
            if (response.code == 500) {
              this.swalPop('Login Failed', response.message, 'error')
            } else {
              this.actDetailUser(localStorage.getItem('id')).then(()=>{
                this.$router.push('/')
              }).catch((err)=>{
                console.log(err)
              })
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
    }
}
</script>

<style scope>
.form-control {
  border: none !important;
  border-bottom: 1px solid lightgrey !important;
}
</style>