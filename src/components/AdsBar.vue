<template>
            <aside id="sidebar">
            <img id="polishop" src="../assets/images/advertising-word-block.jpg" alt="polishop">
            <div><h2>Advertising here</h2></div>
            <div><p>Ads</p></div>
            <div><p>Algumas informacoes importantes</p></div>
            <div><p>Outras informacoes importantes</p></div>

            <footer>
                <p>Social Network Corporation © 2020</p>
            </footer>

        </aside>
</template>

<script>
export default {
}
</script>

<style scoped>
#sidebar {
    border: solid 1px black;
    width: 250px;
    text-align: center;
    background-color: whitesmoke;
    position: fixed;
    top: 70px;
    left: 940px;
    box-shadow:  gray 2px 2px 1px;
}

#polishop {
    width: 80%;
    margin: 5px;
    border: solid 1px;
}

footer {
    position: relative;
    top: 60px;
}
</style>
