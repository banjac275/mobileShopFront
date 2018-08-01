<template>
  <div class="content">
    <div class="log-buttons">
      <div>
        <button class="login--btn" @click="toggleLogin(1)">Log In</button>
        <button class="signin--btn" @click="toggleLogin(2)">Sign Up</button>
      </div>
      <div class="undeline underline__move" :class="{'underline__move--forwards': showLogin === false}"></div>
    </div>
    <hr>
    <transition name="slide" mode="out-in">
      <div class="login__container" v-if="showLogin" key="first">
        <p>E-mail:</p>
        <input class="input--mail" type="email" v-model="user.email">
        <p>Password:</p>
        <div class="input--password__container">
          <input class="input--password" type="password" v-model="user.password">
          <button class="input--eye" @click="showPassword"><font-awesome-icon icon="eye-slash" v-if="showPass" /><font-awesome-icon icon="eye" v-else /></button>
        </div>
        <button class="submit" @click="submit">Submit <font-awesome-icon icon="check" /></button>
      </div>
      <div class="signin__container" v-else key="second">
        <p>First Name:</p>
        <input class="input--mail" type="text" v-model="userSignIn.firstName">
        <p>Last Name:</p>
        <input class="input--mail" type="text" v-model="userSignIn.lastName">
        <p>E-mail:</p>
        <input class="input--mail" type="email" v-model="userSignIn.email">
        <p>Password:</p>
        <input class="input--mail" type="password" v-model="userSignIn.password">
        <p>Confirm Password:</p>
        <input class="input--mail" type="password" v-model="passwordCompare">
        <button class="submit" @click="signNew">Sign Up <font-awesome-icon icon="user-plus" /></button>
      </div>
    </transition>
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
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      userSignIn: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accType: 'user'
      },
      passwordCompare: '',
      showLogin: true,
      showPass: true,
      prevVal: 0
    }
  },
  methods: {
    ...mapActions([
      'logIn',
      'signIn',
      'notify'
    ]),
    submit () {
      let user = this.user
      this.logIn({ user })
        .then(() => {
          this.$router.push('profile')
      })
    },
    signNew () {
      this.userSignIn.passwordCompare = this.passwordCompare;
      this.signIn(this.userSignIn)
        .then(() => {
          this.$router.push('profile')
      })
    },
    showPassword () {
      let passInput = document.querySelector(".input--password")
      this.showPass = !this.showPass;
      (passInput.getAttribute('type') === 'password') ? passInput.setAttribute('type', 'text') : passInput.setAttribute('type', 'password')
    },
    toggleLogin (value) {
      this.notify(false)
      if (this.prevVal === 0 || value !== this.prevVal) {
        (value === 1) ? this.showLogin = true : this.showLogin = false
      }
      this.prevVal = value
    }
  },
  computed: {
    ...mapGetters([
      'getNotificationText',
      'getNotificationShowCheck'
    ])
  }
}
</script>

<style lang="scss" scoped>
  * {
    outline: none;
  }

  .content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 50px);
  }

  .login__container, .signin__container {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 430px;
    width: 100%;
  }

  .login--btn, .signin--btn {
    margin-bottom: 4px;
    padding: 10px 10px 7px 10px;
    font-size: 18px;
    &:hover {
        cursor: pointer;
        background-color: #b8b8b8;
        color: #fff;
      }
  }

  .undeline {
    height: 3px;
    width: 70px;
    background-color: #000;
    margin-bottom: 10px;
  }

  hr {
    width: 90%;
    margin-bottom: 20px;
  }

  input {
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
    line-height: 20px;
    height: 25px;
  }

  .input--mail {
    width: 400px;
  }

  .input--password {
    position: sticky;
    width: 370px;
  }

  .input--eye {
    border-bottom: 1px solid #000;
    height: 25px;
    width: 30px;
    position: sticky;
  }

  .input--password__container {
    display: inline-flex;
  }

  .submit {
    border: 1px solid #000;
    padding: 10px;
    &:hover {
      box-shadow: 0px 0px 5px 5px #b8b8b8;
    }
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

 .slide-leave-active,
  .slide-enter-active {
    transition: .6s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(100%, 0);
  }

  .underline__move {
    transition: all 1.6s;
  }

  .underline__move--forwards {
    transform: translate(110%, 0);
  }
</style>
