<template>
  <div class="main-content" ref='a'>
    <div class="content">
      <img class="lotus-img" src="~@/assets/images/lotus.png" alt="" />
    </div>
    <van-swipe
      v-if="showSwipe"
      class=""
      autoplay="10000"
      indicator-color="white"
      lazy-render
      
    >
      <van-swipe-item v-for="(item,index) in list" :key="index" class="b-main" > 
        <img class="buddha-img" src="~@/assets/images/need-delete.png" alt="" />
        <div class="text-1" align="left">
          <div class="text-2">
            <span class="title-2">功德姓名：</span>
            <div style="flex: 1">
              <span :class="{ 'title-22': showMore }" v-for="(arr,i) in item.pledgers" :key="i">
                {{arr.name}}
              </span>
              <div
                class="show-more"
                v-if="showMore"
                @click="showMore = !showMore"
              >
                更多
              </div>
            </div>
          </div>
          <div class="text-2">
            <span class="title-2">佛像位置：</span>
            <span class="title-22"> {{item.buddhaHallName}}，第{{item.x}}行 第{{item.y}}列</span>
          </div>
        </div>
        <div class="text-1 main" align="left" id="main">
          <div >
            <span class="title-3">祝福</span> <br />
            <div v-for="(arr1,j) in item.buddhaLanguages" :key="j">
           {{arr1}}
           </div>
          </div>
        </div>
        <div class="text-1" @click="go( list[index].expires )">
          <div class="text-flex"  >
            <div class="left">
              <div class="title-3"
                ><span class="title-4">{{dateList[index][4]}} </span>
              <span style="opacity: 0.8; white-space: normal;">{{dateList[index][6]}}</span> <br />
              </div>
              <div class="time">{{dateList[index][1]}}</div>
            </div>
            <div class="right">
              <div class="right-tetx">查看万年历</div>
              <img
                class="right-arrow"
                src="~@/assets/images/right-arrow.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="m-b-40"></div>
      </van-swipe-item>
      
    </van-swipe>
  </div>
</template>

<script>
import rili from './rili/rili.js';
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  
  data() {
    return {
      time1: null,
      showSwipe: false,
      showMore: false,
      code_weixin:null,
      buddhaHallId:sessionStorage.getItem('buddhaHallId'),
      list:[],
      // currentDate:new Date(),//当前时间
      dateList:[],
    }
  },
  created() {},
  mounted() {
    this.timeOut();
    this.getDate()
  },
  methods: {
   
    // 获取时间
    getDate( ){
      this.list.forEach(it=>{
      const a = this.dateFormat(Number(it.expires),'yyyy-MM-dd')
      const b = rili.getData(a)
      b[6]=b[6].join(' ')
      this.dateList.push(b)
      })
     
    },
    // 时间格式化
    dateFormat(time, format="yyyy-MM-dd") {
      var t = new Date(time);
      var tf = function (i) {
        return (i < 10 ? 0 : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
          // break
          case "MM":
            return tf(t.getMonth() + 1);
          // break
          case "mm":
            return tf(t.getMinutes());
          // break
          case "dd":
            return tf(t.getDate());
          // break
          case "HH":
            return tf(t.getHours());
          // break
          case "ss":
            return tf(t.getSeconds());
          // break
        }
      });
    },
    // 轮播延迟
    timeOut() {
      let that = this;
      this.time1 = setTimeout(function () {
        that.showSwipe = true;
      }, 4000);
    },
    go(e) {
      this.$router.push({
        name:'rili',
        query:{
          date:e
        }
      });
    },
  },
};
</script>

<style scoped>
@import "../zc.css";
.main-content {
  width: 100%;
  height: 100%;
  color: #b50201;
  font-size: 12px;
}
.content {
  position: absolute;
  animation: samll 3s;
  animation-fill-mode: forwards;
  animation-delay: 4s;
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/yellowBack.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.lotus-img {
  animation: big 3s;
  animation-fill-mode: forwards;
}
.b-main {
  width: 100%;
  z-index: 0;
  background: url("~@/assets/images/redBack.png");
  background-size: 100% 100%;
}
.buddha-img {
  margin-top: 13%;
  width: 80%;
  height: auto;
}

.text-1 {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 80%;
  background: aqua;
  background: url("~@/assets/images/text-yellow.png");
  border-radius: 8px;
  line-height: 26px;
  padding: 8px 18px;
  margin: 10px 0;
  box-sizing: border-box;
}

.text-2 {
  display: flex;
}
.title-2 {
  font-weight: bold;
  width: 60px;
}
.title-22 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.show-more {
  display: flex;
  justify-content: flex-end;
}
.title-3 {
  font-weight: bold;
  margin-bottom:11px ;
}
.main{
  height: 193px;
  overflow: hidden;
}
.title-4 {
  font-size: 16px;
}
.time {
  display: flex;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.9;
}
.text-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.left {
}
.right {
  position: absolute;
  right: 12%;
  display: flex;
  align-items: center;
 
}
.right-tetx {
  height: 13px;
  width:60px;
  line-height: 13px;
  opacity: 0.7;
}
.right-arrow {
  width: 13px;
  height: 13px;
}

</style>