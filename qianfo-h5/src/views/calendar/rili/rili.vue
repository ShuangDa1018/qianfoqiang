<template>
  <div class="backWhite">
    <div class="calendar">
      <div class="time-head" bindtap="addMonth">
        <div @click="show = true" class="time-now">
          {{ year }}年{{ month }}月
          <img
            class="bottom-arrow"
            src="~@/assets/images/bottom-arrow.png"
            alt=""
          />
        </div>
        <div class="time-today" @click="confirm(new Date())">今日</div>
      </div>
    </div>
    <!-- 周 -->
    <div class="flex-week">
      <div v-for="(item, index) in dayList" :key="index">{{ item }}</div>
    </div>

    <div class="flex-day">
      <div
        class="flex-day-item"
        v-for="(item, index) in listMonth"
        :key="index"
      >
        <div class="listMonth-1" :class="{'today':item[3]=='isday jingri','c-999':item[3]=='unday','thatday':item[0]==thatday&&item[3]!='unday'&&item[2]==thatyear} " >
         <div :class="{'c-B50201':(index%7==0||(index+1)%7==0),'c-fff':item[3]=='isday jingri'}" >{{ item[0] }}</div> 
          <div class="listMonth-2" v-html="item[1]" :class="{'c-41ce8b':item[1].length>=4&&item[1].indexOf('月')==-1,
            'c-B50201':(solarTerm.indexOf(item[1])>-1||lFtv.indexOf(item[1])>-1),
           'c-fff':item[3]=='isday jingri'}"></div>
        </div>
      </div>
    </div>
    <van-dialog v-model="show" show-cancel-button @confirm="confirm">
      <van-datetime-picker
        :default="'选择时间1'"
        v-model="currentDate"
        type="year-month"
        title="选择时间"
        :min-date="minDate"
        :max-date="maxDate"
        visible-item-count="5"
        swipe-duration="1000"
        @change='change'
        :formatter="formatter"
      >
        <slot name="columns-top"><div class="van-datetime">选择时间</div></slot>
      </van-datetime-picker>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { DatetimePicker, Dialog } from "vant";
Vue.use(DatetimePicker);
Vue.use(Dialog);
import rili from "./rili.js";
export default {
  data() {
    return {
      year: 12,
      month: 12,
      days: 1,
      thatday:-1,
      thatyear:null,
      listMonth: [],
      show: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      dayList: ["日", "一", "二", "三", "四", "五", "六"],
     solarTerm:"小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至",
     lFtv:"路神生日元宵节龙抬头端午节天贶节姑姑节彝族火把节七夕情人节鬼节(南方)盂兰节中秋节祭祖节过小年除夕"
    };
  },
  mounted() {
    this.confirm(this.$route.query.date)//通用方法
    this.getthatday(this.$route.query.date)//传过老的日期
  },
  methods: {
    change(){
      if(this.show==false){
        this.confirm()
      }
    },
    getthatday(time){
      this.thatday =this.dateFormat(time?Number(time):this.currentDate,'dd')
      this.thatyear =this.dateFormat(time?Number(time):this.currentDate,'yyyy-MM')
    },
    //获取当日历列表
    confirm(time) {
      const a =this.dateFormat(time?Number(time):this.currentDate,'yyyy-MM')
      this.year = a.slice(0,4)
      this.month = a.slice(5,7)
      const list  = rili.drawCld(Number(this.year),Number(this.month)-1).date
      this.listMonth = list
    },
    // 格式化
    dateFormat(time, format) {
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

    //   自定义
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        if(val[0]==0){
          return val[1]+'月'
        }
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    // 当前时间
   
  },
};
</script>

<style scoped>
@import "../../zc.css";
.backWhite {
  background: #fff;
  height: 100%;
  color: #333333;
  line-height: 22px;
  font-size: 22px;
}
.time-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
.time-now {
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
}
.bottom-arrow {
  width: 11.46px;
  padding-left: 5px;
}
.time-today {
  background: #b50201;
  border-radius: 14px;
  color: #fff;
  font-size: 14px;
  padding: 5px 15px;
}
.flex-week {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  margin-bottom:10px ;
}
.flex-day {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* height: 500px; */
}
.flex-day-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.2857%;
  
}
.today {
  background: #b50201;
  border-radius: 4px;
  color: #fff;
}
.van-datetime {
  margin: auto;
  line-height: 60px;
  font-weight: bold;
}
/deep/ .van-picker__toolbar {
  height: 60px !important;
}

.listMonth-1 {
  display: flex;
  width: 100%;
  min-height: 64px;
  line-height: 22px;
  justify-content: center;
  flex-direction: column;
}
.listMonth-2 {
  font-size: 12px;
  line-height: 16px;
  
}
.thatday{
   background: #d87979;
  border-radius: 4px;
  color: #fff;
}
.c-999{
  opacity: 0.4;
}
.c-41ce8b{
  color:#41ce8b
}
.c-B50201{
  color:#B50201
}
.c-fff{
  color:#fff;
}
</style>