<template>
    <div class="common-layout">
      <el-container>
        <el-header>TROBOT</el-header>
        <el-container>
          <el-aside width="50%">
            <div class="img">
            <ul>
            <v-img alt=" begin"  src="@/assets/begin.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/main.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/teaching.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/stage1.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/stage2.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/stage3.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/finish.png"  height="100vh">
            </v-img><br/>
            <v-img alt=" begin"  src="@/assets/end.png" height="100vh">
            </v-img>
            </ul>
            </div>
          </el-aside>
          <el-main >
            <div class="text">
            開始畫面
            </div>
            <div class="text">
            大廳
            </div>
            <div class="text">
            教學
            </div>
            <div class="text">
            關卡一
            </div>
            <div class="text">
            關卡二
            </div>
            <div class="text">
            關卡三
            </div>
            <div class="text">
            通關
            </div>
            <div class="text">
            結束畫面
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script >
    export default {
        name: 'DemoOne',


    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.common-layout{
 font-size:5vh;
 color: aliceblue;
}
.img{
  margin-top:50px;
  margin-bottom:500px;
}
.text{
  margin-top:50vh;
  margin-bottom:100vh;
}

</style>
