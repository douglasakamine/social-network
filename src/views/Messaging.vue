<template>
<div class="messaging">
    <FriendsList />
    <ChatBox />
</div>
</template>

<script>
import FriendsList from '@/components/FriendsList'
import ChatBox from '@/components/ChatBox'
// @ is an alias to /src

export default {
  components: {
    FriendsList,
    ChatBox
  }

}
</script>

<style scoped>
.messaging {
    margin: 70px auto auto auto;
    display: flex;
    background-color: whitesmoke;
    width: 900px;
    height: 620px;
    align-items: stretch;
    border: solid 1px #cdcfd2;
}
</style>
