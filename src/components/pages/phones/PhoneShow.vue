<template>
  <div class="phone flex">
    <h4><strong>{{phone.name}}</strong></h4>
    <div class="img__container">
      <img :src="setPic" alt="phone pic" class="img">
    </div>
    <div><strong>Manufacturer:</strong> {{phone.manufacturer}}</div>
    <div><strong>Released:</strong> {{phone.released}}</div>
    <div class="description"><strong>Description:</strong> {{phone.description}}</div>
    <div><strong>Number available:</strong> {{phone.numInStock}}</div>
    <div class="phone__buttons">
      <button class="submit" @click="removePhone" v-if="getUserCheck">Delete Phone</button>
      <button class="submit" @click="addToOrders" v-else>Buy Phone</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['phone'],
  data() {
    return {
      defPic: "../../img/phone.png",
      phoneBackup: this.phone._id
    }
  },
  computed: {
    ...mapGetters([
      'getUserType',
      'getUserCheck',
      'getProfileId'
    ]),
    setPic() {
      return (this.phone.picture !== undefined) ? "http://localhost:3000/" + this.phone.picture : this.defPic;
    }
  },
  methods: {
    ...mapActions([
      'removeDevice',
      'newOrder'
    ]),
    removePhone() {
      this.removeDevice( this.phone._id )
      .then((data) => {
        this.$emit('elementDeleted', this.phoneBackup);
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })  
    },
    addToOrders() {
      let order = {
        productId: this.phone._id,
        userId: this.$store.getters.getProfileId,
        quantity: 1
      };

      this.newOrder(order)
      .then(() => {
        console.log("bought")
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
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

.phone {
  min-width: 320px;
  max-width: 320px;
  height: 520px;
  flex-flow: column;
  margin: 20px 5px 20px 5px;
  border: 1px solid #000;
}

.img {
  width: 300px;
  height: 300px;
}

.submit {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  &:hover {
    box-shadow: 0px 0px 5px 5px #b8b8b8;
  }
}

h2 {
  margin-left: 10px;
}

h4 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.description {
  width: 260px;
}
</style>
