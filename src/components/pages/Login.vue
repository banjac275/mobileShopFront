<template>
  <div class="content">
    <h2>Login</h2>
    <p>E-mail:</p>
    <input type="text" v-model="user.email">
    <p>Password:</p>
    <input type="text" v-model="user.password">
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
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
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 50%;
  }

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 400px;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
  }
</style>
