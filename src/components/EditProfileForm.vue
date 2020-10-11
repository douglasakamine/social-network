<template>
  <div class="edit-profile-form">
    <form @submit.prevent="editProfile" name="update-profile">
        <label for="name">Name</label>
        <input id="name" type="text" :value="profile.name">
        <br>
        <label for="birth">Birth</label>
        <input id="birth" type="text" :value="profile.birth">
        <br>
        <input id="city" type="text" :value="profile.city">
        <input id="country" type="text" :value="profile.country">
        <input id="email" type="email" :value="profile.email">
        <input id="work" type="text" :value="profile.work">
        <textarea name="description" id="description" cols="30"
        rows="10" :value="profile.description"></textarea>
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
    display: inline;
}
</style>
