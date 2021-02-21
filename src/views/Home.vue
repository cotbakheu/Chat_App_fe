<template>
  <div class="row side-menu">
    <Profile
      @clicked="offProfile"
      v-if="onProfile"
      class="col-lg-4 shadow-sm"
      style="background-color: white"
    />
    <div
      v-else
      class="col-lg-4 shadow-sm mb-5"
      style="background-color: white"
      id="side"
    >
      <div class="row" style="margin-left: 100px">
        <span
          class="main-font"
          style="font-size: 30px; margin-left: -50px; font-weight: 1000"
        >
          Chat App
        </span>
        <i
          @click.prevent="profile"
          style="font-size: 30px; padding-top: 10px; margin-left: 150px"
          class="fas fa-bars main-font"
        ></i>
      </div>
      <div class="row px-4 mt-5">
        <form action="">
          <!-- <i class="fas fa-search"></i> -->
          <input
            class="form-control"
            type="text"
            placeholder="Type your message..."
          />
        </form>
        <i
          class="fas fa-plus main-font"
          style="font-size: 30px; padding-top: 5px"
        ></i>
      </div>
      <div class="row d-flex p-4 mt-4">
        <button class="btn ml-4">All</button>
        <button class="btn ml-4">Important</button>
        <button class="btn ml-4">Unread</button>
      </div>
      <div>
        <div
          @click.prevent="getListChat(user.id, user.username)"
          v-for="user in listUsers"
          :key="user.id"
          class="d-flex p-2 mt-2"
        >
          <img
            :src="`http://localhost:4000/images/${user.image}`"
            width="30px"
            style="border-radius: 10px"
            alt="image"
          />
          <span style="font-size: 15px; font-weight: 800" class="ml-3">{{
            user.username
          }}</span>
        </div>
      </div>
    </div>
    <!-- message side -->
    <div class="col-lg-8 msg-side" style="overflow: hidden">
      <div class="top-msg shadow-sm row" style="background-color: white">
        <div class="d-flex py-4 col-10">
          <img
            class="d-block ml-3"
            width="50px"
            src="../assets/logo.png"
            alt="picture"
          />
          <span class="ml-4" style="font-weight: 1000">{{ to }}</span>
        </div>
        <button
          @click="onLogout"
          class="btn bt-primary col-1 mt-4"
          style="height: 40px"
        >
          Logout
        </button>
      </div>
      <div style="height: 70vh; overflow: scroll" class="body-msg mt-3">
        <div v-for="item in chats" :key="item.id">
          <div
            v-if="item.from_id == id_from"
            class="mt-2"
            style="
              display: flex;
              justify-content: flex-end;
              width: 90%;
              padding-right: 0;
            "
          >
            <span class="mr-3 msg-from">{{ item.message }}</span>
            <img
              width="30px"
              :src="`http://localhost:4000/images/${item.from_image}`"
              alt="image"
              style="border-radius: 10px"
              class="border"
            />
          </div>
          <div v-else class="mt-2">
            <img
              width="30px"
              :src="`http://localhost:4000/images/${item.from_image}`"
              alt="image"
              style="border-radius: 10px"
              class="border"
            />
            <span class="ml-3 msg-to">{{ item.message }}</span>
          </div>
        </div>
      </div>
      <div class="p-4 bot-msg shadow" style="background-color: white">
        <form>
          <div class="form-group d-flex">
            <input
              v-model="text"
              type="text"
              class="form-control shadow-sm"
              placeholder="Type your message..."
            />
            <button
              @click.prevent="sendMsg"
              class="btn ml-2"
              type="submit"
              style="background-color: #7e98df !important; color: white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'
import store from '../store/index'
import io from 'socket.io-client'
import axios from 'axios'
import {mapActions} from 'vuex'

export default {
  name: 'Home',
  data: () => {
    return {
      socket: io('http://localhost:4000'),
      onProfile: false,
      from: store.getters['auth/getUserData'].name,
      id_from: store.getters['auth/getUserData'].id,
      listUsers: [],
      to: '',
      to_id:'',
      text:'',
      chats: [],
    }
  },
  components: {
    Profile,
  },
  methods: {
    offProfile () {
      this.onProfile = false;
    },
    profile () {
      this.onProfile = true;
    },
    joinRoom() {
      this.socket.emit('joinRoom', this.id_from)
    },
    sendMsg () {
      const data = {
        from: Number(this.id_from),
        to: this.to_id,
        msg: this.text
      }
      this.socket.emit('sendMessage', data)
      this.text = ''
    },
    getListUsers () {
      console.log(this.id_from)
      axios.get(`http://localhost:4000/api/user/${this.id_from}`, {
        headers: {
          'token': store.getters['auth/getToken']
        }
      }).then((res) => {
        this.listUsers = res.data.data
      }).catch(err => console.error(err))
    },
    getListChat(id, name) {
      this.to = name
      this.to_id = id
      this.socket.emit('getListChat', { id_from: this.id_from, id_to: id})
    },
    resListChat() {
      this.socket.on('resListChat', (chat)=>{
        console.log(chat)
        this.chats = chat
      })
    },
    ...mapActions({
      logout: 'auth/logOut',
    }),
    onLogout() {
      this.logout()
      this.$router.push('/login')
    }
  },
  mounted() {
    this.joinRoom()
    this.getListUsers()
    this.resListChat()
    this.sendMsg()
  // this.socket
  }
}
</script>
<style scoped>
#side {
  padding: 50px;
}
.fa-bars {
  margin-left: 90px;
}
.fa-plus {
  margin-left: 115px;
}
.form-control {
  border: none !important;
  background-color: #f7faf8;
  border-radius: 10px;
}
.btn {
  color: black;
  background-color: white !important;
  font-weight: 1000;
}
.btn:hover {
  background-color: #7e98df !important;
  color: white;
}
.sort {
  display: flex !important;
}
.top-msg {
  margin-left: -10px;
}
.bot-msg {
  margin-left: -10px;
}
.msg-side {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vh;
  height: 100vh;
}
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