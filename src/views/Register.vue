<template>
  <div class="container py-5 d-flex justify-content-center align-items-center">
    <div
      class="col-md-4 col-12 shadow py-5 px-5"
      style="background: white; border-radius: 20px"
      id="register"
    >
      <div>
        <p
          class="main-font"
          style="text-align: center; font-weight: 500; font-size: 22px"
        >
          Register
        </p>
      </div>
      <small>Let's create your account!</small>
      <form class="mt-3" @submit.prevent="onReg()">
        <div class="form-group">
          <h5 class="text-bolder" for="exampleInputEmail1">Username</h5>
          <input
            type="text"
            class="form-control"
            placeholder="username"
            id="exampleInputUsername1"
            v-model="form.username"
            required
          />
        </div>
        <div class="form-group">
          <h5 for="exampleInputEmail1">Email</h5>
          <input
            type="email"
            class="form-control"
            placeholder="email@mail.com"
            id="exampleInputEmail1"
            v-model="form.email"
            required
          />
        </div>
        <div class="form-group">
          <h5 for="exampleInputPassword1">Password</h5>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            id="exampleInputPassword1"
            v-model="form.password"
            required
          />
        </div>
        <button type="submit" class="btn mainBtn w-100" style="color: white">
          Register
        </button>
      </form>
      <p class="mt-3 text-center">Register with</p>
      <button class="btn w-100 mainBtn" style="color: white">
        <i class="fab fa-google"></i> Google
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {onTalkMixin} from '../helper/mixins'

export default {
  mixins:[onTalkMixin],
  data:() => {
      return{
          form : {
              username:'',
              email:'',
              password:'',
          }
      }
  },
  methods: {
    ...mapActions({
      userRegister: 'auth/register'
    }),
    onReg () {
      this.swalLoading('Processing Register')
      this.userRegister(this.form)
      .then((response)=>{
        if (response.code === 500) {
          this.swalLoadingClose()
          this.swalPop('Register Error', response.message, 'error')  
        } else {
          this.swalLoadingClose()
          this.swalPop('Register Success', 'You can login now!', 'success')
          this.$router.push('/login')
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
label {
  color: #848484;
}
</style>