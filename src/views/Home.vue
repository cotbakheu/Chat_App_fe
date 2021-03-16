<template>
  <div class="row px-0 py-0 mx-0 my-0">
    <Profile
      @clicked="offProfile"
      v-if="onProfile"
      class="col-4 d-none d-sm-block shadow-sm"
      style="background-color: white"
    />
    <Profile
      @clicked="offProfile"
      v-if="onProfile"
      class="col-12 d-block d-sm-none shadow-sm"
      style="background-color: white"
    />
    <div
      v-else
      class="col-sm-4 col-12 py-3 px-4 mb-5 overflow-auto"
      style="background-color: white"
    >
      <!-- display mobile -->
      <div v-if="!showChat" class="d-block d-sm-none">
        <div
          class="d-flex justify-content-center align-items-center overflow-auto"
        >
          <div class="flex-fill text-center">
            <span class="main-font" style="font-size: 30px; font-weight: 1000">
              OnTalk
            </span>
          </div>
          <div class="flex-fill text-right">
            <div v-cursor="{ cursor: 'pointer' }">
              <i
                @click.prevent="showPopMenu"
                style="font-size: 30px"
                class="fas fa-bars main-font"
              ></i>
            </div>
            <div
              v-if="popMenu"
              class="position-absolute w-50 d-flex justify-content-center mr-5 mr-lg-0"
              style="z-index: 50"
            >
              <div class="shadow rounded bg-light">
                <div
                  v-cursor="{ cursor: 'pointer' }"
                  @click="profile"
                  class="border-bottom p-2"
                >
                  <span style="font-weight: 1000">Profile</span>
                </div>
                <div
                  v-cursor="{ cursor: 'pointer' }"
                  @click="onLogout"
                  class="p-2"
                >
                  <span style="font-weight: 1000">Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex px-lg-4 px-2 mt-5">
          <div class="flex-fill">
            <form action="">
              <input
                v-model="searchUser"
                @keyup="onSearch"
                class="form-control"
                type="text"
                placeholder="Search user..."
              />
            </form>
          </div>
          <div class="ml-3 flex-fill">
            <i
              class="fas fa-plus main-font"
              style="font-size: 30px; padding-top: 5px"
            ></i>
          </div>
          <div v-if="eventSearch" class="position-absolute">
            <div v-for="user in listAllUsers" :key="user.id">
              <img
                :src="`${Web_URL}/images/${user.image}`"
                class="image-fluid"
                style="border-radius: 10px; max-width: 20px"
                alt="user image"
              />
              <span>{{ user.username }}</span>
            </div>
          </div>
        </div>
        <div
          class="row d-flex justify-content-center align-items-center p-lg-3 p-0 mt-4 flex-sm-column flex-md-row mb-md-3"
        >
          <button class="btn text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-0">
            All
          </button>
          <button class="btn text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-1">
            Important
          </button>
          <button class="btn text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-1">
            Unread
          </button>
        </div>
        <div class="border-top mt-md-2 mt-5">
          <div
            v-for="user in friends"
            :key="user.id"
            @click="toMsg(user.id, user.name)"
            class="d-flex p-2 mt-md-2 border-bottom"
          >
            <img
              :src="`${Web_URL}/images/${user.image}`"
              class="image-fluid"
              style="border-radius: 10px; max-width: 40px"
              alt="user image"
            />
            <span style="font-size: 17px; font-weight: 800" class="ml-3">{{
              user.username
            }}</span>
          </div>
        </div>
      </div>
      <!-- display large -->
      <div class="d-none d-sm-block">
        <div
          class="d-flex justify-content-center align-items-center overflow-auto"
        >
          <div class="flex-fill text-center">
            <span class="main-font" style="font-size: 30px; font-weight: 1000">
              OnTalk
            </span>
          </div>
          <div class="flex-fill text-right">
            <div v-cursor="{ cursor: 'pointer' }">
              <i
                @click.prevent="showPopMenu"
                style="font-size: 30px"
                class="fas fa-bars main-font"
              ></i>
            </div>
            <div
              v-if="popMenu"
              class="position-absolute w-50 d-flex justify-content-center mr-5 mr-lg-0"
              style="z-index: 50"
            >
              <div class="shadow rounded bg-light">
                <div
                  v-cursor="{ cursor: 'pointer' }"
                  @click="profile"
                  class="border-bottom p-2"
                >
                  <span style="font-weight: 1000">Profile</span>
                </div>
                <div
                  v-cursor="{ cursor: 'pointer' }"
                  @click="onLogout"
                  class="p-2"
                >
                  <span style="font-weight: 1000">Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex px-lg-4 px-2 mt-5">
          <div class="flex-fill">
            <form action="">
              <input
                v-model="searchUser"
                @keyup="onSearch"
                class="form-control"
                type="text"
                placeholder="Search user..."
              />
            </form>
          </div>
          <div class="ml-3 flex-fill">
            <i
              class="fas fa-plus main-font"
              style="font-size: 30px; padding-top: 5px"
            ></i>
          </div>
          <div v-if="eventSearch" class="position-absolute">
            <div v-for="user in listAllUsers" :key="user.id">
              <img
                :src="`${Web_URL}/images/${user.image}`"
                class="image-fluid"
                style="border-radius: 10px; max-width: 20px"
                alt="user image"
              />
              <span>{{ user.username }}</span>
            </div>
          </div>
        </div>
        <div
          class="row d-flex justify-content-center p-lg-3 p-0 mt-4 flex-sm-column flex-md-row mb-md-3"
        >
          <button
            class="btn flex-fill text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-0"
          >
            All
          </button>
          <button
            class="btn flex-fill text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-1"
          >
            Important
          </button>
          <button
            class="btn flex-fill text-light mainBtn ml-lg-4 mt-sm-2 mt-md-0 ml-1"
          >
            Unread
          </button>
        </div>
        <div class="border-top mt-md-2 mt-5">
          <div
            v-for="user in friends"
            :key="user.id"
            @click="toMsg(user.id, user.name)"
            class="d-flex p-2 mt-md-2 border-bottom"
          >
            <img
              :src="`${Web_URL}/images/${user.image}`"
              class="image-fluid"
              style="border-radius: 10px; max-width: 40px"
              alt="user image"
            />
            <span style="font-size: 17px; font-weight: 800" class="ml-3">{{
              user.username
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- chat side -->
    <!-- large display -->
    <div
      class="col-sm-8 d-none d-sm-block px-0 py-0 mt-0 msg-side"
      style="overflow: hidden; height: 100vh; z-index: 7"
    >
      <div
        v-if="!showChat"
        class="d-sm-flex d-none justify-content-center align-items-center"
        style="overflow: hidden; height: 100vh"
      >
        <h4>Click on your friend list to start chatting!</h4>
      </div>
      <div v-else>
        <div class="col-sm-11 col-12 ml-3 ml-sm-0 d-flex justify-content-end">
          <div
            style="background: white; z-index: 10"
            v-if="targetProfile"
            class="col-12 col-sm-8 col-md-7 col-lg-5 mt-sm-4 mt-0 ml-5 border position-absolute d-flex justify-content-end align-items-end"
          >
            <TargetProfile @hideProfile="hideProfile" />
          </div>
        </div>
        <div
          class="ml-0 ml-sm-2 shadow-sm col-12 row"
          style="background-color: white; height: 15vh"
        >
          <div class="d-flex flex-fill py-md-4 py-2 col-9 col-md-9 col-lg-10">
            <img
              class="d-block ml-md-3 ml-0"
              style="max-width: 50px"
              :src="`${Web_URL}/images/${targetUser.image}`"
              alt="picture"
            />
            <div class="d-flex align-items-center">
              <span class="ml-4" style="font-weight: 1000">{{
                targetUser.name
              }}</span>
            </div>
          </div>
          <div class="col-1 flex-fill d-flex align-items-center ml-md-5 ml-0">
            <div @click="showTargetProfile" v-cursor="{ cursor: 'pointer' }">
              <span class="text-left main-font" style="font-size: 30px"
                ><i class="fas fa-ellipsis-v"></i
              ></span>
            </div>
          </div>
        </div>
        <div style="height: 70vh; overflow-y: scroll" class="body-msg">
          <div class="mt-3 px-5 py-2">
            <div v-for="chat in chats" :key="chat.id">
              <div
                class="d-flex justify-content-end mt-1"
                v-if="chat.user_id == id_user"
              >
                <div
                  class="text-dark p-2"
                  style="background: white; border-radius: 10px"
                >
                  <div class="d-inline-block mr-3" style="font-size: 10px">
                    {{ toDate(chat.created_at) }}
                  </div>
                  {{ chat.message }}
                </div>
              </div>
              <div class="d-flex justify-content-start mt-1" v-else>
                <div
                  class="text-light p-2"
                  style="background: #7e98df; border-radius: 10px"
                >
                  {{ chat.message }}
                  <div class="d-inline-block ml-3" style="font-size: 10px">
                    {{ toDate(chat.created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="p-4 ml-0 ml-sm-2 bot-msg shadow"
          style="background-color: white; height: 15vh"
        >
          <form action="" @submit.prevent="sendMsg">
            <div class="d-flex justify-content-center align-items-center">
              <div class="form-group w-100">
                <input
                  v-model="text"
                  class="form-control border"
                  style="background: #dedfe0"
                  type="text"
                />
              </div>
              <button
                type="submit"
                class="btn mainBtn mx-3 mb-3"
                style="color: white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- small display -->
    <div
      v-if="showChat"
      class="d-block position-absolute d-sm-none col-12 px-0 py-0 mt-0 msg-side"
      style="overflow: hidden; height: 100vh; z-index: 7"
    >
      <div>
        <div class="col-sm-11 col-12 ml-3 ml-sm-0 d-flex justify-content-end">
          <div
            style="background: white; z-index: 10"
            v-if="targetProfile"
            class="col-12 col-sm-8 col-md-7 col-lg-5 mt-sm-4 mt-0 ml-5 border position-absolute d-flex justify-content-end align-items-end"
          >
            <TargetProfile @offTarget="offTarget" />
          </div>
        </div>
        <div
          class="ml-0 ml-sm-2 shadow-sm col-12 row"
          style="background-color: white; height: 15vh"
        >
          <div class="d-flex flex-fill py-md-4 py-2 col-9 col-md-9 col-lg-10">
            <div
              @click="closeChat"
              class="d-block d-sm-none d-flex align-items-center mr-3"
            >
              <i
                class="fas fa-chevron-left main-font"
                style="font-size: 30px"
              ></i>
            </div>
            <img
              class="d-block ml-md-3 ml-0"
              style="max-width: 50px"
              :src="`${Web_URL}/images/${targetUser.image}`"
              alt="picture"
            />
            <div class="d-flex align-items-center">
              <span class="ml-4" style="font-weight: 1000">{{
                targetUser.name
              }}</span>
            </div>
          </div>
          <div class="col-1 flex-fill d-flex align-items-center ml-md-5 ml-0">
            <div @click="showTargetProfile" v-cursor="{ cursor: 'pointer' }">
              <span class="text-left main-font" style="font-size: 30px"
                ><i class="fas fa-ellipsis-v"></i
              ></span>
            </div>
          </div>
        </div>
        <div style="height: 70vh; overflow-y: scroll" class="body-msg">
          <div class="mt-3 px-5 py-2">
            <div v-for="chat in chats" :key="chat.id">
              <div
                class="d-flex justify-content-end mt-1"
                v-if="chat.user_id == id_user"
              >
                <div
                  class="text-dark p-2"
                  style="background: white; border-radius: 10px"
                >
                  <div class="d-inline-block mr-3" style="font-size: 10px">
                    {{ toDate(chat.created_at) }}
                  </div>
                  {{ chat.message }}
                </div>
              </div>
              <div class="d-flex justify-content-start mt-1" v-else>
                <div
                  class="text-light p-2"
                  style="background: #7e98df; border-radius: 10px"
                >
                  {{ chat.message }}
                  <div class="d-inline-block ml-3" style="font-size: 10px">
                    {{ toDate(chat.created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="p-4 ml-0 ml-sm-2 bot-msg shadow"
          style="background-color: white; height: 15vh"
        >
          <form action="" @submit.prevent="sendMsg">
            <div class="d-flex justify-content-center align-items-center">
              <div class="form-group w-100">
                <input
                  v-model="text"
                  class="form-control border"
                  style="background: #dedfe0"
                  type="text"
                />
              </div>
              <button
                type="submit"
                class="btn mainBtn mx-3 mb-3"
                style="color: white"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'
import io from 'socket.io-client'
import {mapActions, mapGetters} from 'vuex'
import {onTalkMixin} from '../helper/mixins'
import TargetProfile from '../components/TargetProfile'

export default {
  mixins:[onTalkMixin],
  name: 'Home',
  data: () => {
    return {
      socket: io('http://localhost:4000'),
      Web_URL: process.env.VUE_APP_URL,
      onProfile: false,
      user: '',
      showChat: false,
      id_user: 0,
      targetProfile:false,
      target: '',
      id_target: 0,
      roomId: 0,
      text:'',
      chats: [],
      friends:[],
      popMenu : false,
      searchUser: '',
      listAllUsers:[],
      eventSearch: false
    }
  },
  components: {
    Profile,
    TargetProfile
  },
  computed: {
    ...mapGetters({
      allUsers : 'users/getAllUsers',
      detailUser: 'users/detailUser',
      targetUser: 'users/getDetailTarget',
      userData : 'auth/getUserData',
    })
  },
  methods: {
    offProfile (val) {
      this.onProfile = val;
    },
    showTargetProfile() {
      this.targetProfile = !this.targetProfile
    },
    closeChat() {
      this.showChat = false
    },
    offTarget(val) {
      this.targetProfile = val
    },
    onSearch() {
      const data = {
        id: Number(localStorage.getItem('id')),
        filter: this.searchUser
      }
      this.actAllUsers(data).then(()=>{
        this.listAllUsers = this.allUsers
        if(this.searchUser.length > 0 && this.listAllUsers.length > 0) {
          this.eventSearch = true
        } else {
          this.eventSearch = false
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    profile () {
      this.popMenu = !this.popMenu
      this.onProfile = true;
    },
    showPopMenu() {
      this.popMenu = !this.popMenu
    },
    toMsg(id) {
      this.actTargetUser(id).then(()=>{
        this.id_user = this.detailUser.id
        this.id_target = this.targetUser.id
        this.user = this.detailUser.name
        this.target = this.targetUser.name
        this.socket.emit('getListChat', {
          user : this.id_user,
          target: this.id_target,
          roomId: Number(localStorage.getItem('roomId'))
        })
        this.showChat = true
      })
    },
    joinRoom() {
      this.socket.emit('joinRoom', Number(localStorage.getItem('roomId')))
    },
    getAllFriends () {
      this.socket.emit('allFriend', {
        id: Number(localStorage.getItem('id')),
        roomId: Number(localStorage.getItem('roomId'))
      })
    },
    resGetAllFriends () {
      this.socket.on('resGetFriend', (data)=>{
        this.friends = data
      })
    },
    sendMsg () {
      const data = {
        user: this.id_user,
        target: this.id_target,
        msg: this.text
      }
      this.socket.emit('sendMessage', data)
      // this.socket.on('resLiveChat', (chat)=>{
      //   this.chats = [...this.chats, chat]
      //   console.log(chat)
      // })
      this.text = ''
    },
    resListChat() {
      this.socket.on('resGetListChat', (chat)=>{
        this.chats = chat
      })
    },
    ...mapActions({
      logout: 'auth/logOut',
      actDetailUser: 'users/actDetailUser',
      actTargetUser: 'users/actTargetUser',
      actAllUsers: 'users/actAllUsers'
    }),
    onLogout() {
      this.swalConfirm('Do you want to logout?','', 'question').then((response)=>{
        if (response) {
          this.logout()
          this.$router.push('/login')
        }
      })
    }
  },
  mounted() {
    this.actDetailUser(localStorage.getItem('id'))
    this.joinRoom()
    this.getAllFriends()
    this.resGetAllFriends()
    // this.getListUsers()
    this.resListChat()
    this.toMsg()
    // this.sendMsg()
  // this.socket
  }
}
</script>
<style scoped>
.form-control {
  border: none !important;
  background-color: #f7faf8;
  border-radius: 10px;
}
/* .btn {
  color: black;
  background-color: white !important;
  font-weight: 1000;
}
.btn:hover {
  background-color: #7e98df !important;
  color: white;
} */

.msg-to {
  background-color: #7e98df;
  color: white;
  border-radius: 10px;
  padding: 5px;
}
.msg-from {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 5px;
}
</style>