<template>
    <div class="container flex">
      <div class="container__top flex"><h2 v-if="getUserCheck">All orders</h2> <h2 v-else>Cart</h2></div>
      <hr>
      <div class="container__middle flex">
        <div v-if="getUserCheck">
          <div v-for="(item, index) in recvData" :key="item._id">
            <user-order :order="item" @orderCanceled="removeOrder($event, index)"></user-order>
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in userData" :key="item._id">
            <orders-per-user :user="item" @userCanceled="deleteOrder($event, index)"></orders-per-user>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Order from './Order.vue'
import OrdersById from './OrdersById.vue'

export default {
  name: 'Cart',
  components: {
    'user-order': Order,
    'orders-per-user': OrdersById
  },
  data() {
    return {
      recvData: [],
      userData: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUserCheck',
      'getProfileId'
    ]),
  },
  methods:{
    ...mapActions([
      'retAllOrders',
      'deleteOrder',
      'userById'
    ]),
    removeOrder(k, ind) {
      let parent = document.querySelector(".container__middle").children[0];
      parent.childNodes[ind].parentNode.removeChild(parent.childNodes[ind])

      this.updateOrders()
    },
    deleteOrder(k, ind) {
      let parent = document.querySelector(".container__middle").children[0];
      parent.childNodes[ind].parentNode.removeChild(parent.childNodes[ind])
      this.updateUser()
    },
    updateOrders() {
      this.recvData = [];
      this.retAllOrders()
      .then(data => {
        data.data.products.forEach(el => {
          if (el.userId !== null) this.recvData.push(el);
        })
      })
    },
    updateUser() {
      let id = this.getProfileId;       
      this.userById({id})
      .then(data => {
        this.userData = data.data.orders;
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      (this.getUserCheck) ? this.updateOrders() : this.updateUser()
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

.container__middle {
  max-width: 70%;
  & > div {
    flex-flow: column;
  }
}

hr {
  width: 60%;
}

h2 {
  margin-left: 10px;
}
</style>
