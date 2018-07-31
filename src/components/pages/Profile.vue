<template>
  <div class="profile--container">
    <h2>{{ getUserName }}'s Profile</h2>
    <hr>
    <div class="showData">
      <div class="img--container">
        <img id="prof-image" src='../../img/user.png' alt="Profile image">
      </div>
      <div class="text-changes">
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
          <input type="file" id="filechooser" v-if="checkedPicture">
          <br>
          <p v-if="checkedPassword">Old Password:</p>
          <input class="input--mail" type="password" v-model="recvData.password" v-if="checkedPassword">
          <p v-if="checkedPassword">New Password:</p>
          <input class="input--mail" type="password" v-model="userEdit.password" v-if="checkedPassword">
          <p v-if="checkedPassword">Repeat New Password:</p>
          <input class="input--mail" type="password" v-model="repeatedPassword" v-if="checkedPassword">
        </div>
      </div>
    </div>
    <button class="submit" @click="enableEditing = !enableEditing">Edit profile <font-awesome-icon icon="pen" /></button>
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
      repeatedPassword: ''
    }
  },
  filters: {
  },
  computed: {
    ...mapGetters([
      'getProfileId',
      'getAuthCode',
      'getUserName'
    ]),
  },
  methods: {
    ...mapActions([
      'userById'
    ]),
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
      })
    }
}
</script>

<style lang="scss" scoped>
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
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.img--container {
  margin-top: 10px;
  margin-bottom: 45px;
  & > img {
    width: 300px;
  }
}

.text-changes {
  height: 400px;
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
}

.submit {
    border: 1px solid #000;
    margin-top: 20px;
    padding: 10px;
    margin-bottom: 30px;
    padding-bottom: 15px;
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
</style>
