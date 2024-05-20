<template>
    <div class="router-container">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About me</router-link> |
            <router-link to="/DemoOne">Vue專案</router-link> 
        </nav>
        <router-view />
    </div>

</template>



<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    nav {
        padding: 30px;
    }

        nav a {
            font-weight: bold;
            color: #ffffff;
        }

            nav a.router-link-exact-active {
                color: #42b983;
            }
    .router-container {
        width: 100%;
        min-height: 100vh;
        background: url("@/assets/background.jpg");
        background-size: cover;
        background-position: center;
    }
</style>
