<template>
  <div style="padding-top: 50px">
    <div class="shadow" style="background: white" id="login">
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
      <form class="mt-3" @submit="onLogin()">
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            id="exampleInputEmail1"
            v-model="form.email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            id="exampleInputPassword1"
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn" style="width: 100%; color: white">
          Login
        </button>
      </form>
      <p class="mt-3" style="text-align: center">Login with</p>
      <button class="btn" style="width: 100%; color: white">Google</button>
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
import Alert from '../helper/swal'

export default {
  mixins: [Alert],
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
          userLogin : 'auth/login'
        }),
        onLogin () {
          this.userLogin(this.form).then(()=>{
            this.$router.push('/')
          }).catch(()=>{})
        }
    }
}
</script>

<style scope>
#login {
  border-radius: 30px;
  width: 30%;
  height: auto;
  margin: auto;
  padding: 50px;
}
.form-control {
  border: none !important;
  border-bottom: 1px solid lightgrey !important;
  color: black;
}
.btn {
  background: #7e98df !important;
  border-radius: 20px !important;
}
label {
  color: #848484;
}
</style>