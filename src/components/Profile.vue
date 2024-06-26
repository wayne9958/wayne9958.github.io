<template>
    <div class="prof">
        <h1>Welcome</h1>
        <li><a href="https://github.com/wayne9958" target="_blank" rel="noopener">MY GITHUB</a></li>
        <h3>
            <span class="white-text">請點擊下方查看我過去的作品影片。</span>
            
        </h3>
        <h3 class="white-text">Here is my Demo videos.</h3>
        <ul>
            <li><a href="https://www.youtube.com/watch?v=LmL0-cEdIak" target="_blank" rel="noopener">畢業專題TROBOT</a></li>
            <br />
            <li><a href="https://www.youtube.com/watch?v=zjyt4eXeNjQ" target="_blank" rel="noopener">與實體機器人連線應用</a></li>
            <br />

        </ul>

    </div>
</template>
s
<script>
    export default {
        name: 'PROF',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .prof {
        color: white; /* 設置組件的文字顏色為白色 */
    }

    .white-text {
        color: white; /* 設置白色文字的樣式 */
    }

    h1 {
        font-size:50px;
        margin: 50px;
    }

    h3 {
        font-size:5vh;
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 50px;
        font-size:5vh;
    }

    a {
        color: #42b983;
    }
</style>