<template>
  <div class="content">
    <!-- <img class="buddha-img" src="~@/assets/images/need-delete.png" alt="" /> -->
    <van-swipe  class="buddha-img" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in addInfo.donateImages" :key="index">
            <img  v-lazy="item">
            <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item"
          />
        </van-swipe-item>
      </van-swipe>
    <div class="background">
      <img
        ref="img"
        class="back-img"
        src="~@/assets/images/paySuccess.png"
        alt=""
      />
      
      <div class="img-text" ref="text">
        <div class="text" @click="go">
          {{addInfo.donateThanks}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem  } from "vant";
import { Image as VanImage } from 'vant';
import Vue from 'vue'
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
export default {
  data(){
    return {
      buddhaHallId:sessionStorage.getItem('buddhaHallId'),
      addInfo:{
        donateThanks:'',
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      this.$axios.get('/app/user/home/buddhaHallConfig',{buddhaHallId:this.buddhaHallId}).then(res=>{
        this.addInfo=res.data
      })
    },
    go() {},
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/redBack.png") no-repeat;
  background-size: 100% 100%;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}
.buddha-img {
  width: 80%;
  height: 40%;
  /* height: auto; */
}
.background {
  margin-top: 20px;
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.back-img {
  z-index: 0;
  /* height: 500px; */
}
.img-text {
  position: absolute;
  display: inline-block;
  color: #b50201;
  height: 80%;
  scale: auto;
  z-index: 10;
  top: 12%;
  left: 0%;
  line-height: 26px;
  overflow: hidden;
  padding: 15px;
  overflow-y: auto;
}
.ceshi {
  background: rgb(0, 255, 136);
}
.text {
  text-align: start;
}
</style>