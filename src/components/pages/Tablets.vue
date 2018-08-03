<template>
    <div class="container flex">
      <div class="container__top flex"><h2>Tablets</h2> <button class="submit" v-if="getUserCheck" @click="addPhone = !addPhone">Add tablet <font-awesome-icon icon="pen" /></button></div>
      <hr>
      <div class="container__middle flex">
        <div v-for="item in recvData" :key="item._id">
          <div class="phone flex">
            <h4><strong>{{item.name}}</strong></h4>
            <div class="img__container">
              <img src="../../img/phone.png" alt="phone pic" class="img">
            </div>
            <div><strong>Manufacturer:</strong> {{item.manufacturer}}</div>
            <div><strong>Released:</strong> {{item.released}}</div>
            <div class="description"><strong>Description:</strong> {{item.description}}</div>
            <div><strong>Number available:</strong> {{item.numInStock}}</div>
            <div class="phone__buttons">
              <button class="submit" @click="removePhone($event)" v-if="getUserCheck">Delete Tablet</button>
              <button class="submit" @click="addToOrders($event)" v-else>Buy Tablet</button>
            </div>
          </div>
        </div>
        <div class="phone flex" v-if="addPhone">
          <h4>name: <strong><input type="text" v-model="newPhoneData.name"></strong></h4>
          <div class="img__container">
            <input type="file" id="filechooser" name="picture">
          </div>
          <div><strong>Manufacturer:</strong> <input type="text" v-model="newPhoneData.manufacturer"></div>
          <div><strong>Released:</strong> <input type="text" v-model="newPhoneData.released"></div>
          <div class="description"><strong>Description:</strong> <input type="text" v-model="newPhoneData.description"></div>
          <div><strong>Number available:</strong> <input type="text" v-model="newPhoneData.numInStock"></div>
          <div class="phone__buttons">
            <button class="submit" @click="insertPhone">Add Tablet <font-awesome-icon icon="pen" /></button>
            <button class="submit" @click="cancelInsert">Cancel</button>
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
      recvData: [],
      addPhone: false,
      newPhoneData: {},
      elnum: 0
    }
  },
  methods:{
    ...mapActions([
      'retAllDevices',
      'insertDevice',
      'removeDevice',
      'newOrder'
    ]),
    insertPhone() {
      this.newPhoneData.type = 'tablet';
      let formData = new FormData();
      let input = document.querySelector("#filechooser");
      if(input.files.length > 0) {
        formData.append("picture", input.files[0]);
      }
      formData.append("name", this.newPhoneData.name);
      formData.append("manufacturer", this.newPhoneData.manufacturer);
      formData.append("released", this.newPhoneData.released);
      formData.append("description", this.newPhoneData.description);
      formData.append("numInStock", this.newPhoneData.numInStock);
      formData.append("type", this.newPhoneData.type);
      this.insertDevice(formData)
      .then(res => {
        document.querySelector(".container__middle").innerHTML = "";
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
    removePhone(event) {
      let parent = document.querySelectorAll(".phone");
      this.changeUser = true;
      parent.forEach((el, ind) => {
        if(el === event.target.parentNode.parentNode) this.elnum = ind;
      })
      console.log(this.elnum)
      this.removeDevice( this.recvData[this.elnum]._id )
        .then((data) => {
          console.log(data)
          this.retAllDevices()
          .then(data => {
            console.log(data);
            this.recvData = data.data.products;
            if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
          })
      })  
    },
    addToOrders(event) {
      let parent = document.querySelectorAll(".phone");
      this.changeUser = true;
      parent.forEach((el, ind) => {
        if(el === event.target.parentNode.parentNode) this.elnum = ind;
      })
      let order = {
        productId: this.recvData[this.elnum]._id,
        userId: this.$store.getters.getProfileId,
        quantity: 1
      };

      this.newOrder(order)
      .then(() => {
        console.log("bought")
      })
    },
    cancelInsert() {
      this.addPhone = !this.addPhone;
      this.newPhoneData = {};
    }
  },
  computed: {
    ...mapGetters([
      'getUserType',
      'getUserCheck',
      'getProfileId'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.retAllDevices()
      .then(data => {
        console.log(data);
        data.data.products.forEach(el => {
          if (el.type === 'tablet') this.recvData.push(el);
        });
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
    })
  },
  updated() {
    let pics = document.querySelectorAll(".img");
    pics.forEach((element, index) => {
      if (this.recvData[index].picture !== undefined) element.src = "https://banji-mobile-shop.herokuapp.com/" + this.recvData[index].picture; 
    });
  }
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

h4 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.img {
  width: 300px;
  height: 300px;
}

.phone {
  min-width: 320px;
  max-width: 320px;
  height: 520px;
  flex-flow: column;
  margin: 20px 5px 20px 5px;
  border: 1px solid #000;

}

.description {
  width: 260px;
}

input[type=text] {
  border-bottom:  1px solid #000;
  outline: none;
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
