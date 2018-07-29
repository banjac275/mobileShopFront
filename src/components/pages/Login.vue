<template>
  <div class="content">
    <div class="log-buttons">
      <div>
        <button class="login--btn" @click="toggleLogin(1)">Log In</button>
        <button class="signin--btn" @click="toggleLogin(2)">Sign In</button>
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
        <button class="submit" @click="signNew">Sign In <font-awesome-icon icon="user-plus" /></button>
      </div>
    </transition>
    <div class="notification__container">
      <transition name="notification">
        <p class="notifications" v-if="showNotification">{{notificationText}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
let notifications = document.querySelector(".notifications");

export default {
  data() {
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
      notificationText: '',
      showNotification: false,
      prevVal: 0
    }
  },
  methods: {
    submit() {
      if(this.user.email === '' || this.user.password === '') {
        this.notificationText = 'Error:\r\nThere is email or password missing. Please fill inputs or sign up.';
        this.showNotification = !this.showNotification;
      } else {
        this.showNotification = false;
        axios({
          method: 'post',
          url: 'https://banji-mobile-shop.herokuapp.com/users/signin',
          data: this.user,
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
          this.notificationText = "Error: Your account can\'t be found due to wrong password or e-mail, or simply because it doesn\'t exist. Repair e-mail and/or password or sign up.";
          this.showNotification = true;
        });
      }
    },
    signNew() {
      if(this.userSignIn.email === '' || this.userSignIn.password === '' || this.userSignIn.firstName === '' || this.userSignIn.lastName === '' || this.passwordCompare === '' || this.passwordCompare !== this.userSignIn.password) {
        this.notificationText = 'Error:\r\nThere is some data missing or passwords dont match. Please fill all inputs correctly.';
        this.showNotification = !this.showNotification;
        console.log(this.userSignIn);
      } else {
        this.showNotification = false;
        axios({
          method: 'post',
          url: 'https://banji-mobile-shop.herokuapp.com/users/signup',
          data: this.userSignIn,
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
          this.notificationText = "Error: Your account wasn\'t made due to an error. Please try again.";
          this.showNotification = true;
        });
      }
    },
    showPassword() {
      let passInput = document.querySelector(".input--password");
      this.showPass = !this.showPass;
      (passInput.getAttribute('type') === 'password') ? passInput.setAttribute('type', 'text') : passInput.setAttribute('type', 'password');
    },
    toggleLogin(value) {
      this.showNotification = false;
      if (this.prevVal === 0 || value !== this.prevVal) {
        (value === 1) ? this.showLogin = true : this.showLogin = false;
      } 
      this.prevVal = value;
    }
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
