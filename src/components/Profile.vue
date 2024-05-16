<template>
    <div class="prof">
        <h1>Welcome</h1>
        <p>
            <span class="white-text">請點擊下方查看我過去的作品影片。</span>
        </p>
        <h3 class="white-text">Here is my Demo videos.</h3>
        <ul>
            <li><a href="https://www.youtube.com/watch?v=LmL0-cEdIak" target="_blank" rel="noopener">畢業專題TROBOT</a></li>
            <br />
            <li><a href="https://www.youtube.com/watch?v=zjyt4eXeNjQ" target="_blank" rel="noopener">與實體機器人連線應用</a></li>
            <br />

        </ul>

    </div>
</template>

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
        margin: 50px;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 50px;
    }

    a {
        color: #42b983;
    }
</style>