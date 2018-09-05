<template>
  <div class="profile">
    <h2>{{ getUserName }}'s Profile</h2>
    <hr>
    <div class="profile__content">
      <div class="profile__content__img--container">
        <img id="prof-image" :src='retPic' alt="Profile image" class="img">
      </div>
      <div class="profile__content__info">
        <button class="submit" @click="enableEditing = !enableEditing">Edit profile <font-awesome-icon icon="pen" /></button>
        <div class="profile__content__info--changes">
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
            <p v-if="checkedPassword">Old Password:</p>
            <input class="input--mail" type="password" v-model="oldPassword" v-if="checkedPassword">
            <p v-if="checkedPassword">New Password:</p>
            <input class="input--mail" type="password" v-model="newPassword" v-if="checkedPassword">
            <p v-if="checkedPassword">Repeat New Password:</p>
            <input class="input--mail" type="password" v-model="repeatedNewPassword" v-if="checkedPassword">
          </div>
          <button class="submit" @click="sendChanges" v-if="enableEditing">Submit changes <font-awesome-icon icon="check" /></button>
        </div>
      </div>
    </div>
    <div class="profile__notification">
      <transition name="notification">
        <p class="profile__notification--text" v-if="getNotificationShowCheck">{{getNotificationText}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imageExists from 'image-exists'

export default {
  data() {
    return {
      recvData: {},
      enableEditing: false,
      userEdit: {},
      checkedPicture: false,
      checkedPassword: false,
      oldPassword: '',
      newPassword: '',
      repeatedNewPassword: ''
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
    retPic() {
      return (this.recvData.picture !== undefined) ? "https://mongo-mobile-shop.herokuapp.com/" + this.recvData.picture : "";
    }
  },
  methods: {
    ...mapActions([
      'userById',
      'notify',
      'submitUserChanges'
    ]),
    sendChanges() {
      let formData = new FormData();
      formData.append("firstName", this.recvData.firstName);
      formData.append("lastName", this.recvData.lastName);
      formData.append("email", this.recvData.email);

      if(this.checkedPicture) {
        let input = document.querySelector("#filechooser");
        if(input.files.length > 0) {
          formData.append("picture", input.files[0]);
        } 
      }

      if(this.checkedPassword && this.oldPassword !== this.newPassword && this.newPassword !== "" && this.newPassword === this.repeatedNewPassword) {
        formData.append("password", this.oldPassword);
        formData.append("passwordNew", this.newPassword);
      }

      this.submitUserChanges({user: formData, id: this.$store.getters.getProfileId})
      .then((data) => {
        console.log(data)
        this.recvData = data.data;
        this.enableEditing = false;
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
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
  outline: none;
}

.profile {
  display: flex;
  align-items: center;
  flex-flow: column;
  height: calc(100% - 71px);
  width: 100%;
  margin-top: 20px;
  &__content {
    width: 700px;
    text-align: center;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-start;
    &__img--container {
      max-height: 300px;
      max-width: 300px;
      height: 300px;
      margin-top: 10px;
      margin-bottom: 45px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__info {
      width: 400px;
    }
  }
  &__notification--text, &__notification {
    margin-top: 30px;
    height: 50px;
    line-height: 50px;
  }
}

hr {
  width: 60%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.input--mail {
  width: 400px;
  border-bottom: 1px solid #000;
  text-align: center;
  margin-top: 1px;
  margin-bottom: 11px;
  font-weight: bolder;
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

#last {
  margin-bottom: 30px;
}

label[for=picture] {
  margin-right: 20px;
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

@media screen and (min-width: 320px) and (max-width: 767px) {
  .profile {
    margin-top: 10px;
    &__content {
      width: 100%;
      flex-flow: column;
      &__img--container {
        min-height: 150px;
        max-height: 150px;
        max-width: 150px;
        height: 150px;
        margin-top: 10px;
        margin-bottom: 10px;
        left: calc(50% - 75px);
        position: sticky;
      }
      &__info {
        width: 100%;
        justify-content: center;
        align-items: center;
        position: sticky;
      }
    }
  }

  .input--mail {
    width: 300px;
  }
}
</style>
