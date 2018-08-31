<template>
  <div>
    <div class="flex orders">
      <div class="orders__product">
        <div><strong>Order ID:</strong> {{order._id}}</div>
        <div><strong>Product Name:</strong> {{order.productId.name}}</div>
        <div><strong>Product Type:</strong> {{order.productId.type}}</div>
        <div><strong>Quantity:</strong> {{order.quantity}}</div>
      </div>
      <div>
        <div><strong>Buyer:</strong> {{order.userId.firstName}} {{order.userId.lastName}}</div>
        <div><strong>Email:</strong> {{order.userId.email}}</div>
      </div>
      <button class="submit" @click="cancelOrder">Cancel Order</button>
    </div>
    <hr>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['order'],
  methods: {
    ...mapActions([
      'deleteOrder'
    ]),
    cancelOrder() {
      this.deleteOrder(this.order._id)
      .then(() => {
        this.$emit('orderCanceled', true);
      })
    }
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
  width: 600px;
  height: 100px;
  &__product {
    width: 200px;
    justify-content: space-around;
  }
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
