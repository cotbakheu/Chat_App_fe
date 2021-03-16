<template>
  <div class="overflow-auto" style="max-height: 100vh">
    <div>
      <div @click="offTarget" class="d-flex align-items-center">
        <div class="d-block d-sm-none d-flex align-items-center mr-3">
          <i class="fas fa-chevron-left main-font" style="font-size: 30px"></i>
        </div>
        <div class="flex-fill">
          <h1 class="main-font text-center mt-2">Profile</h1>
        </div>
      </div>
      <div>
        <!-- Top User -->
        <div class="mt-5">
          <!-- image configuration -->
          <div class="d-flex flex-column align-items-center">
            <div v-if="!targetUser.image">
              <b-spinner
                style="width: 4rem; height: 4rem"
                variant="info"
              ></b-spinner>
            </div>
            <div v-else class="d-flex flex-column align-items-center">
              <img
                class="image-fluid rounded"
                :src="`${Web_URL}/images/${targetUser.image}`"
                style="max-width: 80px"
                alt="Profile Picture"
              />
              <div class="mt-2 text-center">
                <h5>{{ targetUser.name }}</h5>
                <h6>{{ targetUser.bio }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex mt-5">
        <div class="felx-fill text-left">
          <h6>Username:</h6>
          <h6 class="mt-3">Email:</h6>
          <h6 class="mt-3">Phone:</h6>
        </div>
        <div class="flex-fill ml-3">
          <h6>{{ targetUser.username }}</h6>
          <h6 class="mt-3">{{ targetUser.email }}</h6>
          <h6 class="mt-3">{{ targetUser.phone }}</h6>
        </div>
      </div>
      <!-- bottom user -->
      <GoogleMapMaps
        class="maps"
        :center="{ lat: Number(targetUser.lat), lng: Number(targetUser.lng) }"
        :zoom="8"
      ></GoogleMapMaps>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import {mapGetters} from 'vuex'
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
    GoogleMapMaps: VueGoogleMaps.Map
  },
  computed: {
    ...mapGetters({
      targetUser: 'users/getDetailTarget',
    })
  },
  methods: {
    offTarget() {
      this.$emit('offTarget', false)
    }
  },
    mounted () {
  }
}
</script>

<style scope>
.maps {
  width: 300px;
  height: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
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