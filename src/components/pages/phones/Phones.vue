<template>
    <div class="container flex">
      <div class="container__top flex">
        <h2>Phones</h2> 
        <button class="submit" v-if="getUserCheck" @click="addPhone = !addPhone">Add phone <font-awesome-icon icon="pen" /></button>
      </div>
      <hr>
      <div class="container__middle flex">
        <transition name="slide" mode="out-in">
          <div class="flex" v-if="addPhone" key="second">
            <phone-insert @elementAdded="added($event)" @canceledInput="canceled($event)"></phone-insert>
          </div>
          <div v-else key="first" class="container__middle--child flex">
            <div v-for="(item, index) in recvData" :key="item._id">
              <phone-show :phone="item" @elementDeleted="deleted($event, index)"></phone-show>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhoneShow from './PhoneShow.vue'
import PhoneInsert from './PhoneInsert.vue'

export default {
  name: 'Phones',
  components: {
    'phone-show': PhoneShow,
    'phone-insert': PhoneInsert
  },
  data() {
    return {
      recvData: [],
      addPhone: false
    }
  },
  methods:{
    ...mapActions([
      'retAllDevices',
    ]),
    added(check) {
      this.updateData();
    },
    deleted(u, ind) {
      let parent = document.querySelector(".container__middle--child");
      parent.childNodes.forEach((el, index) => {
        if(ind === index) el.parentNode.removeChild(el);
      })
      this.updateData();
    },
    canceled(k) {
      this.addPhone = k;
    },
    updateData() {
      this.retAllDevices()
      .then(data => {
        this.recvData = [];
        data.data.products.forEach(el => {
          if (el.type === 'phone') this.recvData.push(el);
        });
        if(this.$store.getters.getUserType === "admin") this.enableEditing = true;
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
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
      this.updateData();
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
.container {
  flex-flow: column; 
}

.container__top {
  width: 60%;
  flex-flow: row;
}

.container__middle {
  max-width: 60%;
  &--child {
    flex-wrap: wrap;
  }
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

.submit {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
  &:hover {
    box-shadow: 0px 0px 5px 5px #b8b8b8;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: .6s;
}
.slide-enter {
  transform: translate(300%, 0);
}
.slide-leave-to {
  transform: translate(300%, 0);
}
</style>
