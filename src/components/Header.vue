<template>
  <div>
    <nav class="header">
      <div class="logo">
        <router-link to="/"><img src="../assets/webShopLogo.png" alt="banjiShop"></router-link>
      </div>
      <div class="header--right">
        <router-link to="/search">Search <font-awesome-icon icon="search" /></router-link>
        <router-link to="/phones">Phones <font-awesome-icon icon="mobile-alt" /></router-link>
        <router-link to="/tablets">Tablets <font-awesome-icon icon="tablet-alt" /></router-link>
        <router-link to="/users" class="users">Users <font-awesome-icon icon="users" /></router-link>
        <router-link to="/cart">Cart <font-awesome-icon icon="shopping-cart" /></router-link>
        <div class="profile--dropdown__parent">
          <a class="profile--dropdown__btn" @click="profileDropdownClick">{{ getUserName }} <font-awesome-icon icon="users-cog" /></a>
          <div class="profile--dropdown">
            <router-link to="/profile" class="height-shrink" v-if="getConnectionCheck">View Profile</router-link>
            <router-link to="/login" class="height-shrink" v-else>Log In/Sign In</router-link>
            <div class="height-shrink" v-if="getConnectionCheck">Log Out</div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      profile: 'Profile'
    }
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getConnectionCheck'
    ])
  },
  methods: {
    profileDropdownClick() {
      let dropdown = document.querySelector('.profile--dropdown').children;

      Array(dropdown).forEach(element => {
        console.log(element);
        if(element[0].classList.contains("height-shrink")) {
          element[0].classList.add("height-expand");
          element[0].parentNode.classList.remove("no-border");
          element[0].classList.remove("height-shrink");
        } else {
          element[0].classList.add("height-shrink");
          element[0].parentNode.classList.add("no-border");
          element[0].classList.remove("height-expand");
        }
      });
    }
  }
}

</script>

<style lang="scss" scoped>
.header {
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
  height: 50px;
  width: 100%;
  line-height: 50px;
  box-shadow: 0.1px 2px #b4b4b4;
  background-color: #fff;
  z-index: 2;
}

.header--right {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 40%;
  margin-right: 10px;
  a {
      color: #000;
      text-decoration: none;
      width: 100%;
      height: 100%;
      margin-bottom: 5px;
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      &:hover {
        cursor: pointer;
        background-color: #b8b8b8;
        color: #fff; 
      }
  }
}

.profile--dropdown__parent {
  min-width: 80px;
}

.profile--dropdown__btn {
  min-height: 50px;
}

.profile--dropdown {
  background-color: #fff;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  border-radius: 0 0 2px 2px;
  border-right: 1px solid #000;
  cursor: pointer;
  margin-top: 5px;
  /* margin-left: -253px; */
  position: absolute;
  text-align: center;
  width: 290px;
  z-index: 3;
  display: none;
}

.no-border {
  border: 0;
}

.users {
  display: none;
}

.logo {
  margin-left: 10px;
  height: 50px;
  img {
    max-height: 50px;
  }
  &:hover {
    cursor: pointer;
  }
}

.profile--dropdown {
  display: none;
}

.height-expand {
  animation: height-expand .4s ease;
  border: 0;
  min-height: 32px;
}

.height-shrink {
  animation: height-shrink .4s ease;
  border: 0;
  min-height: 0;
}

@keyframes height-shrink {
  from {
    min-height: 32px;
    opacity: 1;
  }
  to {
    min-height: 0;
    opacity: 0;
  }
}

@keyframes height-expand {
  from {
    min-height: 0;
    opacity: 0;
  }
  to {
    min-height: 32px;
    opacity: 1;
  }
}
</style>
