<template>
  <div>
    <nav class="header">
      <div class="logo">
        <router-link to="/"><img src="../assets/webShopLogo.png" alt="banjiShop"></router-link>
      </div>
      <div class="header__right__parent">
        <div class="header--right--minimized" @click="showMenuHandler"><font-awesome-icon icon="bars"></font-awesome-icon></div>
        <div class="right users">
          <router-link to="/search">Search <font-awesome-icon icon="search" /></router-link>
          <router-link to="/phones">Phones <font-awesome-icon icon="mobile-alt" /></router-link>
          <router-link to="/tablets">Tablets <font-awesome-icon icon="tablet-alt" /></router-link>
          <router-link to="/users" v-if="getUserCheck">Users <font-awesome-icon icon="users" /></router-link>
          <router-link to="/cart" v-if="getConnectionCheck">Cart <font-awesome-icon icon="shopping-cart" /></router-link>
          <div class="profile--dropdown__parent" v-on-click-outside="close">
            <a class="profile--dropdown__btn" @click="profileDropdownClick(true)">{{ getUserName }} <font-awesome-icon icon="users-cog" /></a>
            <div class="profile--dropdown no-border" @click="close">
              <router-link to="/profile" class="height-shrink" v-if="getConnectionCheck">View Profile</router-link>
              <router-link to="/login" class="height-shrink" v-else >Log In/Sign In</router-link>
              <div class="height-shrink" @click="logOut" v-if="getConnectionCheck">Log Out</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mixin as onClickOutside } from 'vue-on-click-outside'

export default {
  mixins: [onClickOutside],
  filters: {
    retProfile(value) {
      
    }
  },
  data() {
    return {
      profile: 'Profile',
      showMenu: true
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
    ...mapActions([
      'logOutUser',
      'onStart'
    ]),
    profileDropdownClick(c) {
      let dropdown = document.querySelector('.profile--dropdown').children;
      let btn = document.querySelector('.profile--dropdown__btn');
      for (let i = 0; i < dropdown.length; i++) {
        if(dropdown[i].classList.contains("height-shrink")) {
          if(c) {
            dropdown[i].classList.add("height-expand");
            dropdown[i].parentNode.classList.remove("no-border");
            dropdown[i].classList.remove("height-shrink");
            btn.parentNode.classList.add("add-border-to-btn");
          }
        } else {
          dropdown[i].classList.add("height-shrink");
          dropdown[i].parentNode.classList.add("no-border");
          dropdown[i].classList.remove("height-expand");
          btn.parentNode.classList.remove("add-border-to-btn");
        }
      };
    },
    showMenuHandler() {
      let container = document.querySelector(".right");
      if (this.showMenu && container.classList.contains('users')) {
        container.classList.remove('users')
        container.classList.add('header--right')
        for (let i = 0; i < container.children.length; i++) {
          container.children[i].classList.add("height-expand");
          if (container.children[i].classList.contains("height-shrink")) container.children[i].classList.remove("height-shrink");
        }
      }
      else { 
        container.classList.remove('header--right')
        container.classList.add('users');
        for (let i = 0; i < container.children.length; i++) {
          container.children[i].classList.add("height-shrink");
          if (container.children[i].classList.contains("height-expand")) container.children[i].classList.remove("height-expand");
        }
      }
    },
    close() {
      this.profileDropdownClick(false)
    },
    logOut() {
      this.logOutUser()
      .then(() => {
        this.$router.push('login')
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onStart()
      .then((res) => {
        console.log(res);
      })
    })
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
  width: 100vw;
  line-height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: 0.1px 2px #b4b4b4;
  background-color: #e7e7e7;
  z-index: 2;
}

.header--right {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  /* width: 40%; */
  margin-right: 10px;
  a {
      color: #000;
      background-color: #e7e7e7;
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

.header--right--minimized {
  min-height: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 30px;
    width: 30px;
  }
}

.profile--dropdown__parent {
  position: relative;
  display: inline-block;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}

.profile--dropdown__btn {
  min-height: 50px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: -5px;
}

.profile--dropdown {
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  border-radius: 0 0 2px 2px;
  border-right: 1px solid #000;
  cursor: pointer;
  margin-top: 3px;
  margin-left: -83px;
  position: absolute;
  text-align: center;
  width: 150px;
  z-index: 3;
  & > div:hover {
    cursor: pointer;
    background-color: #b8b8b8;
    color: #fff; 
  }
  a {
    background-color: #e7e7e7;
  }
  div {
    background-color: #e7e7e7;
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

@media screen and (min-width: 320px) and (max-width: 767px) {
    .header--right {
      display: flex;
      flex-flow: column;
      background-color: #fff;
      width: 100vw;
      margin-left: -273px;
      margin-top: 12px;
      z-index: 2;
    }

    .header__right__parent {
      z-index: 1;
      max-height: 40px;
      max-width: 40px;
    }

    .profile--dropdown__parent {
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 50px;
      margin-top: 3px;
      width: 100%;
    }

    .profile--dropdown__btn {
      max-height: 50px;
      padding: 0;
      width: 98%;
    }

    .profile--dropdown {
      border: none;
      width: 98.5%;
      margin-left: 5px;
      margin-top: 80px;
    }

    .logo {  
      z-index: 1;    
      img {
        margin-top: 5px;
        height: 40px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .right {
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      /* width: 40%; */
      margin-right: 10px;
      a {
          color: #000;
          background-color: #e7e7e7;
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

    .header--right--minimized {
      display: none;
    }
  }
</style>
