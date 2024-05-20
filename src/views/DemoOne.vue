<template>
    
    <div class="hello">

        <button @click="ShowIt=!ShowIt" style="color:aliceblue">Show the shop</button>
        <div v-show="ShowIt">
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
            <v-col cols="6">
                <v-btn class="mt-n5"
                       @click="BtnPlus1"
                       density="compact"
                       size="x-small">
                    +
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn class="mt-n5"
                       @click="BtnPlus2"
                       density="compact"
                       size="x-small">
                    +
                </v-btn>
            </v-col>
            <v-col cols="6">
                <div class="mt-n4" style="color: white;">
                    ({{ this.$store.state.Apple}})
                </div>
            </v-col>
            <v-col cols="6">
                <div class="mt-n4" style="color: white;">
                    ({{ this.$store.state.Orange}})
                </div>
            </v-col>
            <v-col cols="6">
                <v-btn class="mt-n5"
                       @click="BtnMinus1"
                       density="compact"
                       size="x-small">
                    -
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn class="mt-n5"
                       @click="BtnMinus2"
                       density="compact"
                       size="x-small">
                    -
                </v-btn>
            </v-col>
            </v-row>
        <div>
            <button style="color:white;" @click="showAlert = true">送出訂單</button>
            <div class="alert" v-show="showAlert">
                您總共下訂了<br/>
                {{this.$store.state.Apple}}個蘋果，<br/>
                {{this.$store.state.Orange}}個橘子，<br/>
                總計的金額是:{{this.$store.state.AppleTotal+this.$store.state.OrangeTotal}}。<br/>
                <button @click="hideAlert">確認訂單</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script >

    export default {
        name: 'DemoOne',
        props: {
            msg: String
        },
        data() {
            return {
                showAlert: false,
                ShowIt:false,
            }
        },
        //點擊事件
        methods: {
            BtnPlus1() {
                this.$store.commit('ApplePlus')
                
            },
            BtnPlus2() {
                this.$store.commit('OrangePlus')
            },
            BtnMinus1() {
                if(this.$store.state.Apple>0){
                this.$store.commit('AppleMinus')
                }
            },
            BtnMinus2() {
                if(this.$store.state.Orange>0){
                this.$store.commit('OrangeMinus')
                }
            },
            hideAlert() {
                this.showAlert = false;
                this.$store.commit('Clear')

            }

        },


    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
    .mt-n5{
        font-size:12px;
        height:30px;
    }
</style>
