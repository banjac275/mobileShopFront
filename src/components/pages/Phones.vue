<template>
    <div class="container flex">
      <div class="container__top flex"><h2>Phones</h2> <button class="submit" v-if="enableEditing" @click="addPhone">Add phone <font-awesome-icon icon="pen" /></button></div>
      <hr>
      <div class="container__middle flex">
        <div v-for="item in recvData" :key="item._id">
          <div class="phone">
            <h4><strong>{{item.name}}</strong></h4>
            <div class="img__container">
              <img src="../../img/phone.png" alt="phone pic" class="img">
            </div>
            <div><strong>Manufacturer:</strong> {{item.manufacturer}}</div>
            <div><strong>Released:</strong> {{item.released}}</div>
            <div><strong>Description:</strong> {{item.description}}</div>
            <div class="phone__buttons">
              <button class="submit">Edit Phone</button>
              <button class="submit">Delete Phone</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      enableEditing: false,
      recvData: []
    }
  },
  methods:{
    ...mapActions([
      'retAllDevices',
    ]),
    addPhone() {

    },
    removePhone() {

    },
    addToOrders(event) {

    },
    removeFromOrders() {

    }
  },
  computed: {
    ...mapGetters([
      'getUserType'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllDevices()
      .then(data => {
        console.log(data);
        data.data.products.forEach(el => {
          if (el.type === 'phone') this.recvData.push(el);
        });
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
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

.container__middle {
  max-width: 60%;
  flex-wrap: wrap;
}

hr {
  width: 60%;
}

h2 {
  margin-left: 10px;
}

.img {
  width: 300px;
  height: 300px;
}

.phone {
  width: 320px;
  height: 500px;
  flex: 0 50%;
  margin: 20px 5px 20px 5px;
  border: 1px solid #000;

}

.submit {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  &:hover {
    box-shadow: 0px 0px 5px 5px #b8b8b8;
  }
}
</style>
