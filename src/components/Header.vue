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
        <router-link to="/login">{{ profile }} <font-awesome-icon icon="users-cog" /></router-link>
        <div class="profile--dropdown">
          <div>{{ log }}</div>
          <div>View Profile</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: 'Profile',
      log: 'Log In'
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
</style>
