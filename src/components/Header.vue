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
        <router-link to="/users" v-if="getUserCheck">Users <font-awesome-icon icon="users" /></router-link>
        <router-link to="/cart">Cart <font-awesome-icon icon="shopping-cart" /></router-link>
        <div class="profile--dropdown__parent" v-on-click-outside="close">
          <a class="profile--dropdown__btn" @click="profileDropdownClick(true)">{{ getUserName }} <font-awesome-icon icon="users-cog" /></a>
          <div class="profile--dropdown no-border" @click="close">
            <router-link to="/profile" class="height-shrink" v-if="getConnectionCheck">View Profile</router-link>
            <router-link to="/login" class="height-shrink" v-else >Log In/Sign In</router-link>
            <div class="height-shrink" v-if="getConnectionCheck">Log Out</div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mixin as onClickOutside } from 'vue-on-click-outside'

export default {
  mixins: [onClickOutside],
  data() {
    return {
      profile: 'Profile'
    }
  },
  computed: {
    ...mapGetters([
      'getUserName',
      'getConnectionCheck',
      'getUserCheck'
    ])
  },
  methods: {
    profileDropdownClick(c) {
      let dropdown = document.querySelector('.profile--dropdown').children;
      let btn = document.querySelector('.profile--dropdown__btn');
      for (let i = 0; i < dropdown.length; i++) {
        if(dropdown[i].classList.contains("height-shrink")) {
          if(c) {
            dropdown[i].classList.add("height-expand");
            dropdown[i].parentNode.classList.remove("no-border");
            dropdown[i].classList.remove("height-shrink");
            btn.classList.add("add-border-to-btn");
          }
        } else {
          dropdown[i].classList.add("height-shrink");
          dropdown[i].parentNode.classList.add("no-border");
          dropdown[i].classList.remove("height-expand");
          btn.classList.remove("add-border-to-btn");
        }
      };
    },
    close() {
      this.profileDropdownClick(false)
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
      min-width: 80px;
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
  min-width: 100px;
  position: relative;
  display: inline-block;
}

.profile--dropdown__btn {
  min-height: 51px;
  min-width: 100px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 10px;
  padding-right: 10px;
}

.profile--dropdown {
  background-color: #fff;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  border-radius: 0 0 2px 2px;
  border-right: 1px solid #000;
  cursor: pointer;
  margin-top: 3px;
  margin-left: -77px;
  position: absolute;
  text-align: center;
  width: 150px;
  z-index: 3;
  & > div:hover {
        cursor: pointer;
        background-color: #b8b8b8;
        color: #fff; 
      }
}

.no-border {
  border: 0;
}

.show 
{
  display:block;
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
.add-border-to-btn {
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}

.height-expand {
  animation: height-expand .4s ease;
  border: 0;
  min-height: 32px;
  display: block;
}

.height-shrink {
  animation: height-shrink .4s ease;
  border: 0;
  min-height: 0;
  display: none;
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
