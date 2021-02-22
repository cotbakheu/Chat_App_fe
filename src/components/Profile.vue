<template>
  <div class="side" style="padding: 50px; overflow: hidden">
    <i
      @click="offProfile"
      class="fas fa-chevron-left main-font"
      style="font-size: 30px"
    ></i>
    <span class="main-font" style="font-size: 30px; margin-left: 150px"
      >Profile</span
    >
    <div class="main-profile">
      <div class="top-user">
        <img
          class="d-block"
          :src="`http://localhost:4000/images/${userData.image}`"
          :style="
            'background-image:url(' +
            imgUrl +
            '),url(http://localhost:4000/images/' +
            userData.image +
            '), url(http://localhost:4000/images/default_photo.png)'
          "
          width="80px"
          alt="profile pic"
        />
        <input
          @input="setImage"
          id="fileImage"
          type="file"
          hidden
          accept="image/x-png,image/gif,image/jpeg"
        />
        <button
          class="btn d-block mt-2"
          onclick="document.getElementById('fileImage').click();"
          style="font-size: 12px; color: white; margin-left: -10px"
        >
          Choose Photo
        </button>
        <button
          class="btn d-block mt-2"
          @click="save('nophoto')"
          style="font-size: 12px; color: white; margin-left: -10px"
        >
          Remove Photo
        </button>
      </div>
      <div class="d-block ml-5">
        <span class="d-block">Username: {{ userData.username }}</span>
        <span class="d-block mt-2">Email: {{ userData.email }}</span>
      </div>
    </div>
    <div class="mt-5">
      <title>Account</title>
      <form @submit.prevent="save()">
        <div class="d-flex">
          <div class="form-group mr-3">
            <label for="">Username</label>
            <input
              type="text"
              v-model="userData.username"
              class="form-control shadow-none"
            />
          </div>
          <div class="form-group">
            <label for="">Phone</label>
            <input
              type="text"
              v-model="userData.phone"
              class="form-control shadow-none"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="">Address</label>
          <input
            type="text"
            v-model="userData.address"
            class="form-control shadow-none"
          />
        </div>
        <button
          type="submit"
          class="btn mt-3"
          style="color: white; margin-left: 200px"
        >
          Submit Change
        </button>
      </form>
    </div>
    <GoogleMapMaps
      class="maps"
      :center="{ lat: -7.250752616465824, lng: 112.75216248469022 }"
      :zoom="10"
    ></GoogleMapMaps>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from '../helper/swal'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  data: () => {
    return {
      userData: {},
      imgUrl: '',
      image: ''
    }
  },
  components:{
    GoogleMapMaps: VueGoogleMaps.Map
  },
    methods: {
        offProfile() {
            this.$emit('clicked', 'false')
        },
        setUserData () {
          axios.get(`http://localhost:4000/api/user/${this.$store.getters['auth/getUserData'].id}`, {
            headers: {
              'token': this.$store.getters['auth/getToken']
            }
          }).then((res) => {
            this.userData = res.data.data[0]
          }).catch(err => console.error(err))
        },
        save (e) {
          console.log(this.userData)
          let data = new FormData()
          this.userData.phone ? data.append('phone', this.userData.phone) : data.append('phone', '')
          this.userData.address ? data.append('address', this.userData.address) : data.append('address', '')
          if (e === 'nophoto') {
            data.append('image', '')
          } else if (this.image) {
            data.append('image', this.image)
          }
          axios.patch(`http://localhost:4000/api/user/${this.userData.id}`, data, {
            headers: {
              'token': this.$store.getters['auth/getToken']
            }
          }).then((res) => {
            this.setUserData()
            Alert.methods.toastSuccess(res.data.message)
          }).catch((err) => {
            Alert.methods.toastDanger(err.response.message)
          })
        },
        setImage(e) {
          const file = e.target.files[0]
          this.imgUrl = URL.createObjectURL(file)
          this.image = file
        }
    },
    mounted () {
    this.setUserData()
  }
}
</script>

<style scope>
.main-profile {
  display: flex;
  margin-top: 50px;
}
.top-user {
  display: flex;
  flex-direction: column;
}
.form-control {
  height: 20px;
}
.maps {
  width: 300px;
  height: 300px;
  margin-top: 20px;
}
</style>