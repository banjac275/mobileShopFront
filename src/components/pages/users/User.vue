<template>
  <div>
    <div class="users--elements">
      <div class="img--container">
        <img src="../../../img/user.png" alt="profile pic" class="pics">
      </div> 
      <div class="middle--container__info">
        <div><strong>First Name:</strong> {{ user.firstName }}</div>
        <div><strong>Last name:</strong> {{ user.lastName }}</div>
        <div v-if="changeUser"><strong>Type:</strong> <input type="text" v-model="user.accType"></div>
        <div v-else><strong>Type:</strong> {{ user.accType }}</div>
        <div><strong>Email:</strong> {{ user.email }}</div>
        <div><strong>Orders:</strong> {{ user.orders | orderCount }}</div>
      </div>
      <div class="middle--container__buttons">
        <button class="submit" v-if="changeUser" @click="confirmClick($event)">Confirm</button>
        <button class="submit type--btn" v-if="editCheck" @click="typeClicked($event)"><span v-if="changeUser">Cancel change</span><span v-else>Change type</span></button>
        <button class="submit" v-if="editCheck" @click="deleteClicked($event)">Delete user</button>
      </div> 
    </div>
    <hr>  
  </div>  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imageExists from 'image-exists'

export default {
  props: ['user', 'editCheck'],
  data() {
    return {
      enableEditing: false,
      changeUser: false,
      userBackup: this.user
    }
  },
  methods: {
    ...mapActions([
      'submitUserChanges',
      'deleteUser'
    ]),
    typeClicked(event) {
      this.changeUser = !this.changeUser;
    },
    confirmClick(event) {
      this.changeUser = !this.changeUser;
      //sends user data for change in database
      if (this.$store.getters.getProfileId === this.user._id) {
        this.submitUserChanges( { user: { accType: this.user.accType}, id: this.user._id })
        .then((data) => {
          console.log(data)
          this.changeUser = false;
          this.$emit('editChecked', !this.editCheck)
        })
      }
    },
    deleteClicked(event) {
      this.changeUser = !this.changeUser;
      if (this.$store.getters.getProfileId === this.user._id) {
        this.deleteUser( this.user._id )
        .then((data) => {
          console.log(data)
          this.changeUser = false;
          this.$emit('editChecked', !this.editCheck)
          this.$emit('elementDeleted', this.userBackup)
        })
      }
    },
    updatePicture() {
      let pics = document.querySelector(".pics");
      if (this.user.picture !== undefined) {
        let link = "http://localhost:3000/" + this.user.picture;
        imageExists(link, (exists) => {
          (exists) ? pics.src = link : pics.src = "../../../img/user.png";
        })
      } 
    }
  },
  computed: {
    ...mapGetters([
      'getUserType',
      'getProfileId'
    ])
  },
  filters: {
    orderCount(value) {
      return value.length;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updatePicture();
    })
  },
  updated() {
    this.updatePicture();
    //this.change = false;
  }
}
</script>

<style lang="scss" scoped>
* {
  outline-color: #b8b8b8;
}

.middle--container__info {
  margin-left: 30px;
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

.users--elements {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
}

.img--container {
  min-width: 140px;
  max-width: 140px;
  height: 140px;
  margin-top: 10px;
  margin-bottom: 10px;
  //margin-right: 30px;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
