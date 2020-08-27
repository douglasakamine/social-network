<template>
    <section class="friends-box">
        <ul class="friend-list">
            <li class="friend-li">
                <img src="../assets/images/john.jpeg" alt="">
                <p>Friend 1</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/batman.png" alt="">
                <p>Friend 2</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/rick-grimes.jpg" alt="">
                <p>Friend 3</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/luke.jpeg" alt="">
                <p>Friend 4</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/batman.png" alt="">
                <p>Friend 5</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/rick-grimes.jpg" alt="">
                <p>Friend 6</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/john.jpeg" alt="">
                <p>Friend 7</p>
                </li>
                 <li class="friend-li">
                <img src="../assets/images/john.jpeg" alt="">
                <p>Friend 8</p>
                </li>
        </ul>
    </section>
</template>

<script>

export default {
}
</script>

<style scoped>
.friends-box {
    display: flex;
    width: 350px;
    flex-direction: column;
}

.friend-list {
    overflow: scroll;
    list-style: none;
}

.friend-li {
    display: flex;
    height: 80px;
    margin: 0;
    border-bottom: 1px solid #cdcfd2;
    cursor: pointer;
    align-items: center;
}

.friend-li img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.friend-li p {
    flex-grow: 1;
    padding: 2px 2px 2px 40px;
    font-weight: bold;
}
</style>
