<template>
    <div class="container flex">
      <div class="container__top flex"><h2 v-if="getUserCheck">All orders</h2> <h2 v-else>Cart</h2></div>
      <hr>
      <div class="container__middle flex">
        <div v-for="item in recvData" :key="item._id">
          <div>{{ item.productId.manufacturer }}</div>
          <div>{{ item.productId.name }}</div>
          <div>{{ item.productId.type }}</div>
          <div>{{ item.userId.firstName }}</div>
          <div>{{ item.userId.lastName }}</div>
          <div>{{ item.quantity }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      recvData: []
    }
  },
  computed: {
    ...mapGetters([
      'getUserCheck'
    ]),
  },
  methods:{
    ...mapActions([
      'retAllOrders',
      'deleteOrder',
      'retAllUsers'
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllUsers()
      .then(data => {
        data.data.products.forEach(el => {
          if(el.orders.length > 0) this.recvData.push(el);
        })
        console.log(this.recvData);
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  flex-flow: column; 
}

.container__top {
  width: 60%;
  flex-flow: row;
}

/* .container__middle {
  max-width: 60%;
  flex-wrap: wrap;
} */

hr {
  width: 60%;
}

h2 {
  margin-left: 10px;
}
</style>
