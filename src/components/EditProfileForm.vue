<template>
  <div class="edit-profile-form">
    <form @submit.prevent="editProfile" name="update-profile">
      <div id="div-name">
        <label for="name">Name</label>
        <input id="name" type="text" :value="profile.name">
        </div>
        <div id="div-birth">
        <label for="birth">Birth</label>
        <input id="birth" type="text" :value="profile.birth">
        </div>
        <div id="div-city">
          <label for="city">City</label>
        <input id="city" type="text" :value="profile.city">
        </div>
        <div id="div-country">
          <label for="country">Country</label>
        <input id="country" type="text" :value="profile.country">
        </div>
        <div id="div-email">
          <label for="email">Email</label>
        <input id="email" type="email" :value="profile.email">
        </div>
        <div id="div-work">
          <label for="work">Work</label>
        <input id="work" type="text" :value="profile.work">
        </div>
        <div id="div-description">
          <label for="description">Description</label>
        <textarea name="description" id="description" cols="30"
        rows="10" :value="profile.description"></textarea>
        </div>
        <button id="editButton" type="submit">Save</button>
    </form>
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
        if (item.id === 'editButton') {
          continue
        }
        this.$store.dispatch('updateProfileInfo', { data: item.id, value: item.value })
        this.updateProfile({ data: item.id, value: item.value })
      }
    }
  },
  mixins: [Utils]

}
</script>

<style scoped>
.edit-profile-form {
    background-color: mintcream;
    position: absolute;
    top: 100px;
    z-index: 9998;
    width: 500px;
}
</style>
