<template>
    <div class="container">
      <div class="top--container">
        <h2>Tablets</h2>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      enableEditing: false,
      recvData: {}
    }
  },
  methods:{
    ...mapActions([
      'retAllDevices',
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllDevices()
      .then(data => {
        console.log(data);
        this.recvData = data.data.products;
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
    })
  },
}
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 10px;
}
</style>
