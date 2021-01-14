<template>
  <div class="content">
    <div class="top">
      <div class="name">姓名</div>
      <input
        v-model="addInfo.name"
        class="input-1 input"
        placeholder="请输入姓名"
        type="text"
      />
    </div>
    <div class="top">
      <div class="name">联系方式</div>
      <input
        v-model="addInfo.phone"
        class="input-1 input"
        placeholder="请输入手机号"
        type="text"
      />
    </div>
    <Login></Login>
    <!-- <button @click="go" class="button">确定</button> -->
    <van-button @click="go" class="button" :loading="loading" type="info">确定</van-button>
  </div>
</template>

<script>
import { Toast, Button } from "vant";
import Login from "./common/login";
Vue.use(Button);
export default {
  components: {
    Login,
  },
  data() {
    return {
      addInfo: {
        buddhaHallId: this.$route.query.buddhaHallId,
      },
      loading: false,
    };
  },
  methods: {
    // 验证
    check() {
      if (this.addInfo.name.length > 10) {
        Toast("姓名长度不能大于10位");
        return false;
      }
      if (!this.$filter.checkPhone(this.addInfo.phone)) {
        Toast("请输入正确的手机号");
        return false;
      }

      return true;
    },
    go() {
      if (this.check()) {
        this.loading = true;
        this.$axios.post("/app/accessbuddha", this.addInfo).then((res) => {
          this.loading = false;
          this.$router.push("/pledgeSuccess");
        }).catch(arr=>{
          this.loading = false
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

/deep/.van-button--info {
  position: fixed;
  width: 100%;
  background: #fbbe0c;
  left: 0;
  bottom: 0;
  height: 45px;
  border: 0;
  color: #b50201;
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