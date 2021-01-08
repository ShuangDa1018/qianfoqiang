<template>
  <div class="content">
    <div class="top">
      <div class="name">姓名</div>
      <input v-model="addInfo.name" class="input-1 input" placeholder="请输入姓名" type="text" />
    </div>
    <div class="top">
      <div class="name">联系方式</div>
      <input v-model="addInfo.phone" class="input-1 input" placeholder="请输入姓名" type="text" />
    </div>
   <Login></Login>
    <button @click="go" class="button">确定</button>
  </div>
</template>

<script>
import { Toast } from 'vant';
import Login from './common/login'
export default {
  components:{
    Login
  },
  data() {
    return {
      addInfo:{
        buddhaHallId:this.$route.query.buddhaHallId,
        // buddhaHallId:this.$router.query.buddhaHallId,
      },
    };
  },
  methods: {
    // 验证
    check(){
      if(this.addInfo.name.length>10){
        Toast('姓名长度不能大于10位')
        return false
      }
      if(!this.$filter.checkPhone(this.addInfo.phone)){
        Toast('请输入正确的手机号')
          return false
      }
      
      return true
    },
    go() {
      if(this.check()){
        // const a= JOSN.parse(sessionStorage.getItem('loginMessgae'))
        // this.addInfo=Object.assign({},this.addInfo,a)
        this.$axios.post('/app/accessbuddha',this.addInfo).then(res=>{
            this.$router.push('/pledgeSuccess')
      })
      }
    },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  padding: 1rem;
  color: #ffeab8;
  font-size: 14px;

}
.top {
  text-align: left;
}
.name {
  display: block;
  margin: 1.5rem 0 0.8rem 0;
}
.input {
  width: 100%;
  background: #ffeab8;
  border: #b50201;
  border-radius: 4px;
  font-size: 13px;
  color: #b50201;
  box-sizing: border-box;
  text-indent: 10px;
}
.input::placeholder {
  color: rgba(181, 2, 1, 0.3);
  text-indent: 10px;
}
.input-1 {
  height: 44px;
}



.button {
  position: fixed;
  width: 100%;
  background: #fbbe0c;
  left: 0;
  bottom: 0;
  height: 45px;
  border: 0;
  color: #b50201;
}
</style>