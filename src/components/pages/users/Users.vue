<template>
    <div class="container">
      <div class="top--container"><h2>Users</h2> <button class="submit" v-if="enableEditing" @click="checkButtons">Edit users <font-awesome-icon icon="pen" /></button></div>
      <hr>
      <div class="middle--container">
        <div v-for="item in recvData" :key="item._id">
          <users-user :user="item" :editCheck="editCheck" :changeUser="changeUser"></users-user>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import User from './User.vue'

export default {
  name: 'Users',
  components: {
    'users-user': User
  },
  data() {
    return {
      recvData: {},
      enableEditing: false,
      editCheck: false,
      changeUser: false
    }
  },
  methods: {
    ...mapActions([
      'retAllUsers'
    ]),
    checkButtons() {
      this.editCheck = !this.editCheck;
      if(this.changeUser === true) this.changeUser = !this.changeUser
    }
  },
  computed: {
    ...mapGetters([
      'getUserType'
    ])
  },
  events: {
    changed(id) {
      this.retAllUsers()
      .then(data => {
        this.recvData = data.data.products;
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllUsers()
      .then(data => {
        console.log(data);
        this.recvData = data.data.products;
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  outline-color: #b8b8b8;
}

.container {
  width: 60%;
}

.top--container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  margin-left: 10px;
}

.submit {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  &:hover {
    box-shadow: 0px 0px 5px 5px #b8b8b8;
  }
}
</style>

