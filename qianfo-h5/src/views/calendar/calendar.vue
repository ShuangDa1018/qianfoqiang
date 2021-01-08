<template>
  <div class="content" ref='body' @touchmove="scroll"> 
    <img src="~@/assets/images/buddha-all.png" alt="" />
    <img
      class="arrow"
      :class="{ 'animation-hiddle': isShow }"
      @click="scroll"
      src="~@/assets/images/arrow.png"
      alt=""
    />
    <div
      v-show="isShow"
      class="button-red"
      :class="{ 'animation-show': isShow }"
    >
      <div class="button-group">
        <div
          class="button-img"
          :class="{ active: isActive == 1 }"
          @click="merits"
        >
          修功德
        </div>
        <div
          class="button-img"
          :class="{ active: isActive == 2 }"
          @click="myBuddha"
        >
          我的佛像
        </div>
      </div>
    </div>
    <Login></Login>
    <Dialog :show="show" 
    :message="'你未确认认捐佛像，请联系佛殿管理员认捐~'"
     confirmText="确认"
     @confirm='show=false'></Dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  components: {
    Dialog:()=>import('@/views/common/dialog'),
    Login:()=>import('@/views/common/login')
  },
  data() {
    return {
      isActive: null,
      isShow: false,
      show:false,
      list:[],
      buddhaHallId:sessionStorage.getItem('buddhaHallId'),
    };
  },
  watch:{
    isShow(val){
      if(val){
        this.getList()
      }
    }
  },
  mounted(){
    
  },
  methods: {
    merits() {
      this.isActive = 1;
      this.$router.push("/payment");
    },
        // 获取当前
    getList(){
      this.$axios.get('/app/user/home/userBuddha',{params:{buddhaHallId:this.buddhaHallId}}).then(res=>{
          this.list=res.data
          // need delete
          this.list=[
                      {
                "buddhaHallId": 0,
                "buddhaHallName": "扬中太平寺",
                "buddhaLanguageClassificationId": 0,
                "buddhaLanguageClassificationName": "",
                "buddhaLanguageMethod": "",
                "buddhaLanguages": [
                   '李潇潇、莫笑笑、罗欢雨三、李四、王五、莫笑笑、罗欢雨、暂晓晓、李四、王...',
                   '李潇潇、张、李四、李四、王李、罗欢雨、暂晓晓、李四、王...',
                  
                ],
                "buddhaMusicClassificationId": 0,
                "buddhaMusicClassificationName": "",
                "buddhaMusicMethod": "",
                "buddhaMusics": [],
                "createTime": "2019-05-22 18:00:00",
                "expires": "1509898857000",
                "id": 0,
                "marquee": "2019-05-22 18:00:00",
                "name": "佛像名稱",
                "number": 0,
                "picture": "~@/assets/images/need-delete.png",
                "pledgers": [
                  {
                    "name": "譚雙12",
                    "phone": "1898636969",
                    "userId": 0
                  },{
                    "name": "譚雙21",
                    "phone": "1898636969",
                    "userId": 0
                  }
                ],
                "presenceStatus": 0,
                "updateTime": "2019-05-22 18:00:00",
                "x": 10,
                "y": 10
              },
                 {
                "buddhaHallId": 0,
                "buddhaHallName": "扬中太平寺",
                "buddhaLanguageClassificationId": 0,
                "buddhaLanguageClassificationName": "",
                "buddhaLanguageMethod": "",
                "buddhaLanguages": [
                    '李潇潇、莫笑笑、罗欢雨三、李四、王五、莫笑笑、罗欢雨、暂晓晓、李四、王...',
                   '李潇潇、张、李四、李四、王李、罗欢雨、暂晓晓、李四、王...',
                   '李潇潇、张、李四、李四、王李、罗欢雨、暂晓晓、李四、王...',
                   '李潇潇、张、李四、李四、王李、罗欢雨、暂晓晓、李四、王...',
                ],
                "buddhaMusicClassificationId": 0,
                "buddhaMusicClassificationName": "",
                "buddhaMusicMethod": "",
                "buddhaMusics": [],
                "createTime": "2019-05-22 18:00:00",
                "expires": "1609898857000",
                "id": 0,
                "marquee": "1609898857000",
                "name": "佛像名稱",
                "number": 0,
                "picture": "~@/assets/images/need-delete.png",
                "pledgers": [
                  {
                    "name": "譚雙1",
                    "phone": "1898636969",
                    "userId": 0
                  },
                  {
                    "name": "譚雙",
                    "phone": "1898636969",
                    "userId": 0
                  }
                ],
                "presenceStatus": 0,
                "updateTime": "2019-05-22 18:00:00",
                "x": 10,
                "y": 10
              }
          ]
      })
    },
    myBuddha() {
      this.isActive = 2;
      if(this.list&&this.list.length){
        this.$router.push({
          name:'lotus',
          query:{
            list:JSON.stringify(this.list)
          }
        })
        return
      } 
      this.show=true
      // Dialog.confirm({
      //   message: "",
      //   showCancelButton: false,
      // });
      // this.$router.push('/pledge')
    },
    // 监听手
    scroll(){
        this.isShow=true
    }
  },
};
</script>

<style scoped>
@import "../zc.css";
.content {
  position: relative;
  height: 100%;
  /* background: rgb(35, 202, 180); */
  text-align: center;
  display: flex;
  justify-content: center;
}
img {
  width: 100%;
  height: 100%;
}
.animation-show {
  animation: show 2s;
  animation-fill-mode: forwards;
}
.animation-hiddle {
  display: none;
}

.arrow {
  animation: hiddle 1.5s infinite;
  position: fixed;
  bottom: 40px;
  width: auto;
  height: 5%;
  z-index: 10;
}
.button-red {
  opacity: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 124px;
  background: url("~@/assets/images/red.png");
  background-size: 100% 100%;
}
.button-group {
  position: fixed;
  bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.button-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 154.07px;
  height: 46px;
  background: url("~@/assets/images/button.png") no-repeat;
  background-size: 100% 100%;
  color: #765a28;
  font-weight: bold;
  font-size: 14px;
}
.button-img:last-child {
  margin-left: 16px;
}
.active {
  color: #bb1916;
}

.model {
  display: flex;

  justify-content: center;
  align-items: center;
}
.model-main {
  position: absolute;
  animation: show 1s;
  animation-fill-mode: forwards;
  background: #fff;
  opacity: 1;
  color: #202020;
  border-radius: 10px;
  width: 325px;
}
.sure-text {
  display: flex;
  padding: 20px 20px 0 20px;
  justify-content: center;
  align-items: center;
  height: 81px;
  border: 1px solid hsl(0, 0%, 60%, 0.2);
}
.sure-button {
  color: #b50201;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.van-dialog{
  background: #b50201;
}
</style>