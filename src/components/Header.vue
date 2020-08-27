<template>

    <header id="header">
        <nav class="headerNav">
        <div id="logo"><h1>Social Network</h1></div>
        <input id="search" type="search" placeholder="Search...">
        <nav class="links">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/friends">Friends</router-link></li>
                <li><a href="#">Messaging</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
    </nav>
    </header>
</template>

<script>
export default {
}

</script>

<style scoped>

#header {
    background-color: #2620d8;
    padding-left: 80px;
    padding-right: 80px;
    width: 100%;
    height: 50px;
    position: fixed;
    text-align: center;
    top: 0;
    left: 0;
}

.headerNav {
    display: flex;
    align-items: center;
    width: 1050px;
    height: 50px;
}

#logo {
    width: 250px;
    color: white;
    flex-grow: 1;
}

#search {
    width: 300px;
    height: 35px;
    border-radius: .2em;
    border: none;
    background-color: whitesmoke;
    flex-grow: 2;
    outline: none;
}

.search-button {
    color: black;
    outline: none;
}

.links {
    flex-grow: 3;
}

.links ul {
    display: flex;
    vertical-align: middle;
    text-align: right;
    list-style: none;
    justify-content: flex-end;
}
.links a {
    color: white;
    padding: 10px;
    margin: 10px;
    text-decoration: none;
    font-weight: bold;
}

</style>
