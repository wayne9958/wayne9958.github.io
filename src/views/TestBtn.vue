<template>
    <div>
        <button @click="showAlert = true">顯示提醒</button>
        <div class="alert" v-show="showAlert">
            彈出性提醒！
            <button @click="hideAlert">關閉</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAlert: false
            };
        },
        methods: {
            hideAlert() {
                this.showAlert = false;
            }
        }
    };
</script>

<style scoped>
    .alert {
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

        .alert button {
            background-color: transparent;
            border: none;
            color: #721c24;
            cursor: pointer;
        }
</style>