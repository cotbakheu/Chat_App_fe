<template>
  <div style="padding-top: 50px">
    <div class="shadow" style="background: white" id="register">
      <div>
        <p
          style="
            text-align: center;
            color: #7e98df;
            font-weight: 500;
            font-size: 22px;
          "
        >
          Register
        </p>
      </div>
      <small>Let's create your account!</small>
      <form class="mt-3" @submit.prevent="onReg()">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            id="exampleInputUsername1"
            v-model="form.username"
          />
        </div>
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
          Register
        </button>
      </form>
      <p class="mt-3" style="text-align: center">Register with</p>
      <button class="btn" style="width: 100%; color: white">Google</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
            this.userRegister(this.form)
            .then(()=>{
                this.$router.push('/login')
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scope>
#register {
  border-radius: 30px;
  width: 30%;
  height: auto;
  margin: auto;
  padding: 50px;
}
.btn {
  background: #7e98df !important;
  border-radius: 20px !important;
}
.form-control {
  border: none !important;
  border-bottom: 1px solid lightgrey !important;
  color: black;
}
label {
  color: #848484;
}
</style>