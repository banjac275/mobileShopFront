<template>
  <div class="flex orders">
    <div class="orders--child flex">
      <div>
        <div><strong>Order ID:</strong> {{user._id}}</div>
        <div><strong>Product Name:</strong> {{recvData.name}}</div>
        <div><strong>Product Type:</strong> {{recvData.type}}</div>
        <div><strong>Quantity:</strong> {{user.quantity}}</div>
      </div>
      <div>
        <button class="submit" @click="cancelOrder">Cancel Order</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['user'],
  data() {
    return {
      recvData: {}
    }
  },
  methods: {
    ...mapActions([
      'retDevice',
      'deleteOrder'
    ]),
    cancelOrder() {
      this.deleteOrder(this.user._id)
      .then(() => {
        this.$emit('userCanceled', false);
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.retDevice(this.user.productId)
      .then(el => {
        this.recvData = el.data;
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orders {
  flex-flow: column;
}

.orders--child {
  flex-flow: row;
  width: 600px;
}

.submit {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  &:hover {
    box-shadow: 0px 0px 5px 5px #b8b8b8;
  }
}

hr {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>
