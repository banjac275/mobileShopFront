<template>
  <div class="content">
    <h1>Welcome to Banji Mobile Web Shop! - Your source of good phones and tablets</h1>
    <hr class="hr--first">
    <p>To start looking for your new phone or tablet, go to cards named Phone or Tablet. If you want<br>
     to make a purchase, log in with your account or create a new one if you don't have<br>
     it. You can also change your profile and add a profile picture if you like that. <br>
    If you prefer to search a certain phone or tablet you can do that by<br>
    clicking on search card. There you can search by category.</p>
    <hr class="hr--second">
    <h4>We hope that you'll like our site! Happy browsing!</h4>
    <div class="pic">
      <img src="../../assets/webShopLogo.png" alt="banjiShop">
    </div>
    <div class="triangle"></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
  text-align: center;
  width: 100%;
  margin-top: 40px;
}

.triangle {
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-left-width: 111px;
  border-right-width: 111px;
  border-top: 111px solid #a3a2a2;
  filter: blur(5px);
}

h1 {
  font-size: 30px;
}

h4 {
  font-size: 20px;
}

p {
  font-size: 24px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.hr--first {
  width: 80%;
}

.hr--second {
  width: 40%;
}

.pic > img{
  width: 400px;
}
</style>
