<template>
    <div class="chat-box">
        <div class="box-messaging">
                <div class="message">Hey! How is it going?<div class="time">14:05</div></div>
                <div class="message">Would you like to go to the party tonight?
                    <div class="time">14:07</div></div>
                </div>
            <div class="typing-box"><textarea name="messaging" id="" cols="70"
            rows="10" placeholder="Write a message..."></textarea>
            <button id="send-message">Send</button>
    </div>
    </div>
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

.message {
    width: 350px;
    padding: 15px 15px 5px 15px;
    border: solid 1px #B4D6D3;
    background-color: #B4D6D3;
    border-radius: 1em;
    margin-bottom: 10px;
}

.time {
    font-style: italic;
    font-size: 12px;
    text-align: right;
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
