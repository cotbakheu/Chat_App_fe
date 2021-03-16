<template>
  <div class="p-5 overflow-auto" style="max-height: 100vh">
    <div>
      <div class="d-flex align-items-center">
        <div class="flex-fill">
          <i
            @click="offProfile"
            class="fas fa-chevron-left main-font"
            style="font-size: 30px"
          ></i>
        </div>
        <div class="flex-fill">
          <h1 class="main-font">Profile</h1>
        </div>
      </div>
      <div>
        <!-- Top User -->
        <div class="mt-5">
          <!-- image configuration -->
          <div class="d-flex flex-column align-items-center">
            <div v-if="!detailUser.image">
              <b-spinner
                style="width: 4rem; height: 4rem"
                variant="info"
              ></b-spinner>
            </div>
            <div v-else>
              <img
                class="image-fluid rounded"
                :src="`${Web_URL}/images/${detailUser.image}`"
                style="max-width: 80px"
                alt="Profile Picture"
              />
            </div>
            <input
              type="file"
              hidden
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked($event)"
            />
            <div
              @click="onPickFile"
              class="position-absolute text-center mainBtn configPhoto"
            >
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div
              @click="delPhoto"
              class="position-absolute mt-4 text-center mainBtn configPhoto"
            >
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
          <div class="text-center mt-3">
            <h6>{{ userData.bio }}</h6>
          </div>
        </div>
      </div>
      <!-- bottom user -->
      <div class="mt-5">
        <form @submit.prevent="save()">
          <div class="d-flex justify-content-end">
            <div v-if="toEdit" @click="onEdit" class="btn mainBtn text-light">
              Edit
            </div>
            <button v-else type="submit" class="btn mainBtn text-light">
              Save Edit
            </button>
          </div>
          <div class="form-group mr-3">
            <label class="text-dark" for="">Bio</label>
            <input
              v-if="toEdit"
              type="text"
              v-model="detailUser.bio"
              class="form-control shadow-none bg-light"
              disabled
            />
            <input
              v-else
              type="text"
              v-model="detailUser.bio"
              class="form-control shadow-none"
            />
          </div>
          <div class="d-flex">
            <div class="form-group border-right pr-2 mr-3">
              <label for="">Username</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.username"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.username"
                class="form-control shadow-none"
              />
            </div>
            <div class="form-group">
              <label for="">Email</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.email"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.email"
                class="form-control shadow-none"
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group border-right pr-2 mr-3">
              <label for="">Name</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.name"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.name"
                class="form-control shadow-none"
              />
            </div>
            <div class="form-group">
              <label for="">Phone</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.phone"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.phone"
                class="form-control shadow-none"
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group mr-3 border-right pr-2">
              <label for="">Latitude</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.lat"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.lat"
                class="form-control shadow-none"
              />
            </div>
            <div class="form-group">
              <label for="">Longitude</label>
              <input
                v-if="toEdit"
                type="text"
                v-model="detailUser.lng"
                class="form-control shadow-none bg-light"
                disabled
              />
              <input
                v-else
                type="text"
                v-model="detailUser.lng"
                class="form-control shadow-none"
              />
            </div>
          </div>
        </form>
      </div>
      <GoogleMapMaps
        class="maps"
        :center="{ lat: Number(detailUser.lat), lng: Number(detailUser.lng) }"
        :zoom="8"
      >
        <GoogleMapMarker
          :position="{
            lat: parseFloat(detailUser.lat),
            lng: parseFloat(detailUser.lng),
          }"
        ></GoogleMapMarker>
      </GoogleMapMaps>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import {mapActions, mapGetters} from 'vuex'
import {onTalkMixin} from '../helper/mixins'

export default {
  mixins: [onTalkMixin],
  data: () => {
    return {
      userData: {},
      imgUrl: '',
      image: '',
      toEdit: true,
      Web_URL: process.env.VUE_APP_URL,
    }
  },
  components:{
    GoogleMapMaps: VueGoogleMaps.Map,
    GoogleMapMarker: VueGoogleMaps.Marker
  },
  computed: {
    ...mapGetters({
      detailUser: 'users/detailUser'
    })
  },
  methods: {
    ...mapActions({
      actDetailUser: 'users/actDetailUser',
      actUpdateUser: 'users/actionUpdateUser',
      actDeletePhoto: 'users/actDeletePhoto'
    }),
    offProfile() {
        this.$emit('clicked', false)
    },
    onEdit() {
      this.toEdit = false
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    save() {
      this.swalConfirm('Do you want to save change?', '', 'question' ).then((response)=>{
        if (response) {
          this.swalLoading('Updating Data')
          this.actUpdateUser(this.detailUser).then((response)=>{
            if (response.code === 500) {
              this.swalLoadingClose()
              this.swalPop('Failed Update Data', response.message, 'error')
            }
            this.actDetailUser(localStorage.getItem('id'))
            this.swalLoadingClose()
            this.toEdit = true
            this.swalPop('Success Update Data','', 'success')
          })
        }
      })
    },
    onFilePicked (event) {
      // alert('tes')
      // this.swalLoading('Uploading Photo')
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
        // this.swalLoadingClosed()
      })
      fileReader.readAsDataURL(files[0])
      const fd = new FormData()
      fd.append('image', files[0])
      console.log(files[0])
      this.actUpdateUser(fd)
      .then((result) => {
        console.log(result)
        if (result.code === 500) {
          this.swalPop('Update Photo Fail', result.message, 'error')
        } else {
          this.actDetailUser(localStorage.getItem('id'))
          this.swalPop('Update Photo Success', '', 'success')
        }
        // this.swalLoadingClosed()
      }).catch((err) => {
        // this.swalLoadingClosed()
        console.log(err)
      })
    },
    delPhoto() {
      this.swalConfirm('Do you want to delete photo?','', 'warning').then((response)=>{
        if (response) {
          this.actDeletePhoto().then((response)=>{
            if (response.code === 500) {
              this.swalPop('Failed', response.message, 'error')
            } else {
              this.actDetailUser(localStorage.getItem('id'))
              this.swalPop('Success Delete Photo', '', 'success')
            }console.log(response)
          }).catch((err)=>{
            console.log(err)
          })
        }
      })
    },
  },
    mounted () {
      this.actDetailUser(localStorage.getItem('id'))
  }
}
</script>

<style scope>
.maps {
  width: 300px;
  height: 300px;
  margin-top: 20px;
}
.configPhoto {
  height: 20px;
  width: 20px;
  font-size: 13px;
  border-radius: 5px !important;
  margin-left: 100px;
  color: white;
}
</style>