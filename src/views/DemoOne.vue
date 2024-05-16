<template>
    <div class="hello">
        <v-row>
            <v-col cols="6">
                <v-img src="@/assets/apple.png"
                       alt="Apple"
                       max-height="100"
                       class="movedapple"></v-img>
            </v-col>
            <v-col cols="6">
                <v-img src="@/assets/orange.png"
                       alt="Orange"
                       max-height="100"
                       class="movedorange"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <div class="movedtext" style="color: white;">
                    二十五元
                </div>
            </v-col>
            <v-col cols="6">
                <div class="movedtext2" style="color: white;">
                    三十元
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <div class="movedtext" style="color: white;">
                    ({{ AppleCount}})
                </div>
            </v-col>
            <v-col cols="6">
                <div class="movedtext2" style="color: white;">
                    ({{ OrangeCount}})
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-btn class="movebtn"
                       @click="handler">
                    buy it
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn class="movebtn2"
                       @click="handler2">
                    buy it
                </v-btn>
            </v-col>
        </v-row>
        <div>
            <button style="color:white;" @click="showAlert = true">送出訂單</button>
            <div class="alert" v-show="showAlert">
                您總共下訂了<br/>
                {{AppleCount}}個蘋果，<br/>
                {{OrangeCount}}個橘子，<br/>
                總計的金額是:{{ChildCount}}。<br/>
                <button @click="hideAlert">確認訂單</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DemoOne',
        props: {
            msg: String
        },
        data() {
            return {
                ChildCount: 0,
                showAlert: false,
                AppleCount: 0,
                OrangeCount: 0
            }
        },
        //點擊事件
        methods: {
            handler() {
                this.ChildCount += 25
                this.AppleCount++
                this.$emit('child-count-change', this.ChildCount)
            },
            handler2() {
                this.ChildCount += 30
                this.OrangeCount++
                this.$emit('child-count-change', this.ChildCount)
            },
            hideAlert() {
                this.showAlert = false;
                this.ChildCount = 0
                this.AppleCount = 0
                this.OrangeCount = 0

            }

        },

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
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
    button{
        margin-top:20px;
    }
</style>
