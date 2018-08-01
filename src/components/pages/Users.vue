<template>
    <div class="container">
      <div class="top--container"><h2>Users</h2></div>
      <hr>

      <div class="middle--container">
        <div v-for="(item, index) in recvData" :key="item._id">
          <div class="users--elements">
            <div>
              <img src="" alt="profile pic">
            </div> 
            <div>
              <div>Name: {{ item.firstName }}</div>
              <div>Last name: {{ item.lastName }}</div>
              <div>Type: {{ item.accType }}</div>
              <div>Email: {{ item.email }}</div>
              <div>Orders: {{ item.orders }}</div>
            </div>
            <div>
              {{ index }}
            </div> 
          </div>
          <hr>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      recvData: {}
    }
  },
  methods: {
    ...mapActions([
      'retAllUsers'
    ]),

  },
  /* computed: {
    ...mapGetters([
      ''
    ])
  }, */
  mounted() {
    this.$nextTick(() => {
      this.retAllUsers()
      .then(data => {
        console.log(data);
        this.recvData = data.data.products;
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.users--elements {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
</style>

