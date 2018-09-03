<template>
  <div class="phone flex">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      newPhoneData: {}
    }
  },
  methods:{
    ...mapActions([
      'insertDevice'
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
      if(Object.keys(this.newPhoneData).length > 5) {
        this.insertDevice(formData)
        .then(res => {
          this.$emit('elementAdded', true);
          this.$emit('canceledInput', false);
        })
        .catch(err => {
        if(err === "Auth failed") this.$router.push('login')
      })
      }
    },
    cancelInsert() {
      this.$emit('canceledInput', false);
      this.newPhoneData = {};
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

input[type=text] {
  border-bottom:  1px solid #000;
  outline: none;
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
</style>