<template>
    <div class="container">
      <div class="top--container"><h2>Users</h2> <button class="submit" v-if="enableEditing" @click="checkButtons">Edit users <font-awesome-icon icon="pen" /></button></div>
      <hr>
      <div class="middle--container">
        <div v-for="(item, index) in recvData" :key="item._id">
          <users-user :user="item" :editCheck="editCheck" :changeUser="changeUser" @editChecked="editCheck = $event" @elementDeleted="deleted($event, index)"></users-user>
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
    },
    deleted(u, ind) {
      let parent = document.querySelector(".middle--container");
      console.log(parent.childNodes)
      parent.childNodes.forEach((el, index) => {
        if(ind === index) el.parentNode.removeChild(el);
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserType'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllUsers()
      .then(data => {
        console.log(data);
        this.recvData = data.data.products;
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
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
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;
}

.top--container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.middle--container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column;    
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

@media screen and (min-width: 320px) {
  .container {
    min-width: 100%;
    margin: 0;
    hr {
      width: 80%;
    }
  }
  .top--container {
    width: 80%;   
  }
}
</style>

