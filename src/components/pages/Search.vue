<template>
  <div class="search flex">
    <div class="search__bar"><input type="text" placeholder="Search devices..." v-model="searchText.text"><button @click="searchDevice"><font-awesome-icon icon="search" /></button></div>
    <hr>
    <div class="flex wrap">
      <div v-for="(item, index) in recvData" :key="item._id">
        <show-phone :phone="item" @elementDeleted="deleted($event, index)"></show-phone>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhoneShow from './phones/PhoneShow.vue'

export default {
  name: 'Search',
  components: {
    'show-phone': PhoneShow
  },
  data() {
    return {
      recvData: {},
      searchText: {
        text: ''
      }
    }
  },
  methods:{
    ...mapActions([
      'srcDevice',
    ]),
    searchDevice() {
      let search = this.searchText;
      this.srcDevice({search})
      .then(data => {
        this.recvData = data.data.products;
      })
      .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
    },
    deleted(u, ind) {
      let parent = document.querySelector(".container__middle--child");
      parent.childNodes.forEach((el, index) => {
        if(ind === index) el.parentNode.removeChild(el);
      })
      this.updateData();
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: calc(100vh - 50px);
  flex-flow: column;
  margin: 10px;
  & input {
    line-height: 25px;
    height: 25px;
    width: 300px;
    border-bottom: 1px solid #000;
    margin-right: 10px;
  }
  & button {
    line-height: 25px;
    height: 25px;
    width: 25px;
  }
}

.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.wrap {
  flex-wrap: wrap;
  max-width: 60%;
  justify-content: center;
}

hr {
  width: 80%;
  margin: 10px;
}

@media screen and (min-width: 320px) {
  .wrap {
    max-width: 100%;
  }
}
</style>