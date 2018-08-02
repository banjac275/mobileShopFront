<template>
    <div class="container">
      <div class="top--container"><h2>Users</h2> <button class="submit" v-if="enableEditing" @click="checkButtons">Edit users <font-awesome-icon icon="pen" /></button></div>
      <hr>

      <div class="middle--container">
        <div v-for="item in recvData" :key="item._id">
          <div class="users--elements">
            <div class="img--container">
              <img src="../../img/user.png" alt="profile pic" class="pics">
            </div> 
            <div class="middle--container__info">
              <div><strong>First Name:</strong> {{ item.firstName }}</div>
              <div><strong>Last name:</strong> {{ item.lastName }}</div>
              <div v-if="changeUser"><strong>Type:</strong> <input type="text" v-model="item.accType"></div>
              <div v-else><strong>Type:</strong> {{ item.accType }}</div>
              <div><strong>Email:</strong> {{ item.email }}</div>
              <div><strong>Orders:</strong> {{ item.orders | orderCount }}</div>
            </div>
            <div class="middle--container__buttons">
              <button class="submit" v-if="changeUser" @click="confirmClick($event)">Confirm</button><button class="submit type--btn" v-if="editCheck" @click="typeClicked($event)">Change type</button><button class="submit" v-if="editCheck" @click="deleteClicked($event)">Delete user</button>
            </div> 
          </div>
          <hr>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      recvData: {},
      enableEditing: false,
      editCheck: false,
      changeUser: false,
      elnum: 0
    }
  },
  methods: {
    ...mapActions([
      'retAllUsers',
      'submitUserChanges',
      'deleteUser'
    ]),
    checkButtons() {
      this.editCheck = !this.editCheck;
      if(this.changeUser === true) this.changeUser = !this.changeUser
    },
    typeClicked(event) {
      //let parent = document.querySelectorAll(".users--elements")
      this.changeUser = !this.changeUser;
      /* parent.forEach((el, ind) => {
        if(el === event.target.parentNode.parentNode) this.elnum = ind;
      })
      console.log(this.elnum) */
    },
    confirmClick(event) {
      let parent = document.querySelectorAll(".users--elements")
      this.changeUser = true;
      parent.forEach((el, ind) => {
        if(el === event.target.parentNode.parentNode) this.elnum = ind;
      })
      console.log(this.recvData[this.elnum]._id)
      this.recvData[this.elnum].picture = "";
      this.submitUserChanges( { user: this.recvData[this.elnum], id: this.recvData[this.elnum]._id })
        .then((data) => {
          console.log(data)
          this.retAllUsers()
          .then(data => {
            console.log(data);
            this.recvData = data.data.products;
            if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
          })
      })
    },
    deleteClicked(event) {
      let parent = document.querySelectorAll(".users--elements")
      this.changeUser = true;
      parent.forEach((el, ind) => {
        if(el === event.target.parentNode.parentNode) this.elnum = ind;
      })
      this.deleteUser( this.recvData[this.elnum]._id )
        .then((data) => {
          console.log(data)
          this.retAllUsers()
          .then(data => {
            console.log(data);
            this.recvData = data.data.products;
            if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
          })
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserType'
    ])
  },
  filters: {
    orderCount(value) {
      return value.length;
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
  },
  updated() {
    let pics = document.querySelectorAll(".pics");
    pics.forEach((element, index) => {
      if (this.recvData[index].picture !== undefined) element.src = "https://banji-mobile-shop.herokuapp.com/" + this.recvData[index].picture; 
    });
  }
}
</script>

<style lang="scss" scoped>
* {
  outline-color: #b8b8b8;
}

.users--elements {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}

.img--container {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
  align-items: center;
  & > img {
    min-width: 100px;
    max-width: 100px;
    min-height: 100px;
    border-radius: 50%;
  }
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

.middle--container__info {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 110px;
  width: 400px;
}

.middle--container__buttons {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 120px;
}

input {
  border-bottom: 1px solid #000;
  outline: none;
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

