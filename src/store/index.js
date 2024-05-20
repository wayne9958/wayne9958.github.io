import { createStore } from 'vuex'

export default createStore({
  state(){
    return{
      Apple:0,
      Orange:0,
      AppleTotal:0,
      OrangeTotal:0,
    }
  },
  getters: {
  },
  mutations: {
    ApplePlus(state){
      state.Apple++
      state.AppleTotal+=25
    },
    AppleMinus(state){
      state.Apple--
      state.AppleTotal-=25
    },
    OrangePlus(state){
      state.Orange++
      state.OrangeTotal+=30
    },
    OrangeMinus(state){
      state.Orange--
      state.OrangeTotal-=30
    },
    Clear(state){
      state.Orange=0,
      state.Apple=0,
      state.AppleTotal=0,
      state.OrangeTotal=0
    }
  },
  actions: {
  },
  modules: {
  }
})
