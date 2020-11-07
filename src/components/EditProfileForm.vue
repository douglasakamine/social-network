<template>
 <div class="modal-wrapper">
  <div class="edit-profile-form">
    <form @submit.prevent="editProfile" name="update-profile">
      <div class="div-input">
        <label for="name">Name</label>
        <input id="name" type="text" :value="profile.name">
      </div>
        <div class="div-input">
          <label for="birth">Birth</label>
          <input id="birth" type="date" :value="profile.birth">
        </div>
        <div class="div-input">
          <label for="city">City</label>
        <input id="city" type="text" :value="profile.city">
        </div>
        <div class="div-input">
          <label for="country">Country</label>
        <input id="country" type="text" :value="profile.country">
        </div>
        <div class="div-input">
          <label for="email">Email</label>
        <input id="email" type="email" :value="profile.email">
        </div>
        <div class="div-input">
          <label for="work">Work</label>
        <input id="work" type="text" :value="profile.work">
        </div>
        <div class="div-input">
          <label for="description">Description</label>
        <textarea name="description" id="description" cols="30"
        rows="10" :value="profile.description"></textarea>
        </div>
        <div class="form-buttons">
        <button id="cancelButton" @click="closeEditProfileInfoButton">Cancel</button>
        <button id="saveButton" type="submit">Save</button>
        </div>
    </form>
   </div>
  </div>
</template>

<script>
import Utils from '../mixins/UtilsMixin'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo'
    })
  },
  methods: {
    editProfile () {
      for (var item of event.target) {
        if (item.id === 'cancelButton' || item.id === 'saveButton') {
          continue
        }
        var newValue = item.value
        if (item.id === 'birth') {
          var myDate = new Date(newValue)
          var newDate = myDate.getTime()
          newValue = newDate
        }
        this.updateProfile({ data: item.id, value: newValue })
      }
      this.closeEditProfileInfoButton()
    },
    closeEditProfileInfoButton () {
      this.$store.dispatch('setEditProfileInfoButton', false)
    }
  },
  mixins: [Utils]

}
</script>

<style scoped>
.edit-profile-form {
    background-color: mintcream;
    position: fixed;
    left: 33%;
    top: 15%;
    overflow: auto;
    z-index: 9997;
    width: 500px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    border-radius: .5em;
    padding: 10px;
}
.div-input {
  margin: 5px;
  padding: 2px;
  display: flex;
  flex-direction: column;
}
label {
  font-size: 15px;
}
form input {
  width: auto;
}
.form-buttons {
  display: flex;
  justify-content: space-between;
}
#saveButton {
    color: white;
    font-size: 15px;
    border: none;
    background-color: #008CBA;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    border-radius: .2em;
    cursor: pointer;
}
#cancelButton {
    color: black;
    font-size: 15px;
    border: black solid 1px;
    background-color: mintcream;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    border-radius: .2em;
    cursor: pointer;
}
.modal-wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  background-color: rgba(0, 0, 0, 0.8);
  display: table;
}
</style>
