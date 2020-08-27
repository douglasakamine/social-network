<template>
    <section class="chat-box">
        <div class="box-messaging">
                <div class="message">Hello Douglas How Are You?</div>
                </div>
            <div class="typing-box"><textarea name="messaging" id="" cols="70"
            rows="10" placeholder="Write a message..."></textarea>
            <button id="send-message">Send</button>
    </div>
    </section>
</template>

<script>

export default {
}
</script>

<style scoped>
.chat-box {
    flex-grow: 2;
    border-left: solid 1px #cdcfd2;
}
.box-messaging {
    height: 400px;
    border-bottom: solid 4px #2620d8;
    padding: 20px 10px 0px 40px;
}

.typing-box {
    height: 195px;
    position: relative;
}

.typing-box textarea {
    outline: none;
    border: none;
}

#send-message {
    border: none;
    color: white;
    background-color: blue;
    font-size: 16px;
    width: 80px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    position: absolute;
    margin: 2px;
    bottom: 2px;
    right: 10px;
}
</style>
