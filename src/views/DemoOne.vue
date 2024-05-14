<template>
    <div class="hello">
        <Total>
            總共的金額是 {{ChildCount}}
        </Total><br />
        <img alt="apple" src="@/assets/apple.png">
        <img alt="orange" src="@/assets/orange.png"><br />
        <dollar>
            25元
        </dollar>
        <dollar2>
            30元
        </dollar2>
        <br />
        <button @click="handler">
            buy it
        </button>
        <button @click="handler2">
            buy it
        </button>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
          ChildCount:0
      }
  },
  methods: {
      handler() {
          this.ChildCount+=25
          this.$emit('child-count-change', this.ChildCount)
      },
      handler2() {
          this.ChildCount+=30
          this.$emit('child-count-change', this.ChildCount)
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
button{

    margin :50px;
    
}
dollar{
    margin-right : 200px;
}
</style>
