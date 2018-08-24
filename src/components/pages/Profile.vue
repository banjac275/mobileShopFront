<template>
  <div class="profile--container">
    <h2>{{ getUserName }}'s Profile</h2>
    <hr>
    <div class="showData">
      <div class="img--container">
        <img id="prof-image" src='../../img/user.png' alt="Profile image" class="img">
      </div>
      <div class="info--container">
        <button class="submit" @click="enableEditing = !enableEditing">Edit profile <font-awesome-icon icon="pen" /></button>
        <div class="text-changes">
          <button class="submit" @click="sendChanges" v-if="enableEditing">Submit changes <font-awesome-icon icon="check" /></button>
          <p>First Name:</p>
          <input class="input--mail" type="text" v-model="userEdit.firstName" v-if="enableEditing">
          <p v-else> <strong>{{ recvData.firstName }}</strong></p>
          <p>Last Name:</p>
          <input class="input--mail" type="text" v-model="userEdit.lastName" v-if="enableEditing">
          <p v-else> <strong>{{ recvData.lastName }}</strong></p>
          <p>E-mail:</p>
          <input class="input--mail" type="email" v-model="userEdit.email" v-if="enableEditing">
          <p v-else> <strong>{{ recvData.email }}</strong></p>
          <p>Account type:</p>
          <p> <strong>{{ recvData.accType }}</strong></p>
          <div v-if="enableEditing">
            <input type="checkbox" name="picture" v-model="checkedPicture">
            <label for="picture">Change Picture</label>
            <input type="checkbox" name="password" v-model="checkedPassword">
            <label for="password">Change Password</label>
            <br>
            <input type="file" id="filechooser" name="picture" v-if="checkedPicture">
            <br>
            <p v-if="checkedPassword">New Password:</p>
            <input class="input--mail" type="password" v-model="newPassword" v-if="checkedPassword">
          </div>
        </div>
      </div>
    </div>
    <div class="notification__container">
      <transition name="notification">
        <p class="notifications" v-if="getNotificationShowCheck">{{getNotificationText}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      recvData: {},
      defImg: '../../img/user.png',
      enableEditing: false,
      userEdit: {},
      checkedPicture: false,
      checkedPassword: false,
      newPassword: '',
    }
  },
  filters: {
  },
  computed: {
    ...mapGetters([
      'getProfileId',
      'getAuthCode',
      'getUserName',
      'getNotificationText',
      'getNotificationShowCheck'
    ]),
  },
  methods: {
    ...mapActions([
      'userById',
      'notify',
      'submitUserChanges'
    ]),
    sendChanges() {
      let formData = new FormData();
      if(this.checkedPicture) {
        let input = document.querySelector("#filechooser");
        if(input.files.length > 0) {
          formData.append("picture", input.files[0]);
          this.userEdit.picture = formData;
        } else {
          this.userEdit.picture;
        }
      } else {
        this.userEdit.picture = "";
      }

      if(this.checkedPassword) {
        this.userEdit.password = this.newPassword;
      }
      console.log(this.userEdit.password)
      this.submitUserChanges({user: this.userEdit, id: this.$store.getters.getProfileId})
        .then((data) => {
          console.log(data)
          //this.$router.push('profile')
          if (this.recvData.picture !== undefined || this.recvData.picture !== null )
          document.querySelector("#prof-image").src = "https://banji-mobile-shop.herokuapp.com/" + this.recvData.picture;
          this.enableEditing = false;
      })
    },
    imageExists(imageSrc, good, bad) {
      let img = new Image();
      img.onload = good; 
      img.onerror = bad;
      img.src = imageSrc;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let id = this.$store.getters.getProfileId;
      this.userById({ id })
      .then((res) => {
        console.log(res);
        this.recvData = res.data;
        this.userEdit = res.data;
        let img = document.querySelector("#prof-image");
        let link = "https://banji-mobile-shop.herokuapp.com/" + this.recvData.picture;
        if(this.recvData.picture !== undefined) {
          img.onerror = () => img.src = this.defImg;
          img.src = link;
        }
      })
    })
  },
  updated() {
    console.log(this.recvData.picture)
    /* if (this.recvData.picture !== undefined && document.querySelector("#prof-image") !== null) document.querySelector("#prof-image").src = "https://banji-mobile-shop.herokuapp.com/" + this.recvData.picture; 
    else document.querySelector("#prof-image").src = this.defImg; */
  }
}
</script>

<style lang="scss" scoped>
* {
  outline-color: #b8b8b8;
}

.profile--container {
  display: flex;
  //justify-content: space-between;
  align-items: center;
  flex-flow: column;
  height: calc(100% - 71px);
  width: 100%;
  margin-top: 20px;
}

hr {
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.img--container {
  margin-top: 10px;
  margin-bottom: 45px;
  margin-right: 30px;
  & > img {
    width: 300px;
    border-radius: 50%;
  }
}

.info--container {
  min-width: 400px;
}

.input--mail {
  width: 400px;
  border-bottom: 1px solid #000;
  text-align: center;
  margin-top: 1px;
  margin-bottom: 11px;
  font-weight: bolder;
}

.showData {
  width: 400px;
  text-align: center;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

.submit {
    border: 1px solid #000;
    margin-top: 20px;
    padding: 10px;
    margin-bottom: 30px;
    &:hover {
      box-shadow: 0px 0px 5px 5px #b8b8b8;
    }
  }

#filechooser {
  margin: 20px;
}

label[for=picture] {
  margin-right: 20px;
}

#last {
  margin-bottom: 30px;
}

.notifications, .notification__container {
  margin-top: 30px;
  height: 50px;
  line-height: 50px;
}

.notification-enter {
  opacity: 0;
}

.notification-enter-active {
  transition: opacity .8s;
}

.notification-leave {
  opacity: 1;
}

.notification-leave-active {
  transition: opacity .8s;
  opacity: 0;
}
</style>
