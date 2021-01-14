<template>
  <div class="content">
    <div class="top">
      <div class="name">功德名称</div>
      <input
        v-model="addInfo.name"
        class="input-1 input"
        placeholder="请输入姓名"
        type="text"
      />
    </div>
    <div class="top">
      <div class="name">心愿</div>
      <textarea
        v-model="addInfo.content"
        class="input input-2"
        placeholder="请输入心愿"
        name=""
        id=""
        cols="10"
        rows="10"
      ></textarea>
    </div>
    <div class="top m-b-60">
      <div class="name">功德名称</div>
      <div class="pay">
        <div
          class="price"
          :class="{ active: isActive == item.index }"
          @click="changePrice(item)"
          v-for="item in list"
          :key="item.index"
        >
          {{ item.name }} <span v-if="item.index !== 6">元</span>
        </div>
        <input
          v-show="isActive == 6"
          v-model="addInfo.price"
          class="input input-1 price-input"
          placeholder="自定义（ 单位： 元 ）"
          type="text"
        />
      </div>
    </div>
    <van-button type="info" @click="go" :loading="loading">确定</van-button>
  </div>
</template>

<script>
// import Dialog from '@/views/common/dialog'
import Vue from "vue";
import wx from "weixin-jsapi";
import { Toast, Button } from "vant";
Vue.use(Button);
Vue.use(Toast);
export default {
  components: {
    // Dialog
  },
  data() {
    return {
      isActive: 0,
      addInfo: {
        paymentMethod: "WECHAT",
        buddhaHallId: sessionStorage.getItem("buddhaHallId"),
      },
      list: [
        { index: 1, name: "10" },
        { index: 2, name: "50" },
        { index: 3, name: "100" },
        { index: 4, name: "200" },
        { index: 5, name: "500" },
        { index: 6, name: "自定义" },
      ],
      show: false,
      payData: {},
      timeout: null,
      orderId: 1,
      loading: false,
    };
  },
  mounted() {
    this.isPay();
  },
  methods: {
    check(val) {
      //验证整数
      let reg = new RegExp(/^[1-9]{1}[0-9]*$/);
      return reg.test(val);
    },
    // 确认
    go() {
      if (!this.addInfo.name) {
        Toast("请输入功德名称");
        return;
      }
      if (!this.addInfo.content) {
        Toast("请输入心愿");
        return;
      }
      if (this.isActive == 0) {
        Toast("请选择功德");
        return;
      }
      if (this.isActive == 6) {
        // if (!this.check(this.addInfo.price)) {
        //   Toast("请输入正确的整数");
        //   return;
        // }
      }
      this.loading = true;
      this.pay();
      this.show = true;
    },
    // 支付
    pay() {
      this.$axios
        .post("app/user/home/payDonate", this.addInfo)
        .then((res) => {
          const a = JSON.parse(res.data);
          this.orderId = a.orderId;
          // this.timeout = setInterval(()=>{
          //   this.isPay()
          // }, 1000);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wx5e4724fa68c00771", // 必填，公众号的唯一标识
            // timestamp: a.timeStamp, // 必填，生成签名的时间戳
            // nonceStr: '', // 必填，生成签名的随机串
            // signature: a.paySign,// 必填，签名
            jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表
          });
          let that = this;
          wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.chooseWXPay({
              timestamp: a.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: a.nonceStr, // 支付签名随机串，不长于 32 位
              package: a.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: a.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: a.paySign, // 支付签名
              success: function (res) {
                // 支付成功后的回调函数
                that.loading = false;
                that.isPay();
              },
              // 支付取消回调函数
              cencel: function (res) {
                that.loading = false;
                Toast("取消支付~");
              },
              // 支付失败回调函数
              fail: function (res) {
                that.loading = false;
                Toast(res);
              },
            });
          });
        })
        .catch((arr) => {
          this.loading = false;
          Toast("支付失败");
        });
    },
    // 是否支付成功
    isPay() {
      let query = {
        id: this.orderId,
      };
      this.$axios.get("/app/transaction/ispay", query).then((res) => {
        if (res.data) {
          this.$router.push("/paySuccess");
        } else {
          Toast("支付失败");
        }
      });
    },
    changePrice(item) {
      this.isActive = item.index;
      if (item.index == 6) {
        this.addInfo.price = "";
        return;
      }
      this.addInfo.price = item.name;
    },
  },
  destroyed() {
    clearInterval(this.timeout);
  },
};
</script>

<style scoped>
.content {
  /* overflow-y:scroll ; */
  position: relative;
  padding: 1rem;
  color: #ffeab8;
  font-size: 14px;
  background: #b50201;
}
.top {
  text-align: left;
}

.name {
  display: block;
  margin: 1rem 0 0.6rem 0;
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
  height: 3rem;
}
.input-2 {
  line-height: 1.4rem;
  height: 12rem;
  padding: 0.6rem;
}
.pay {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.price {
  padding: 3% 4.5%;
  font-size: 0.9rem;
  margin-bottom: 2%;
  display: inline;
  width: 22%;
  text-align: center;
  border: 1px solid #ffeab8;
  border-radius: 4px;
}
.price-input {
  height: 3rem;
  margin: 0.5rem 0;
}
.active {
  background: #ffeab8;
  color: #b50201;
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
/deep/.van-dialog {
  background: #b50201;
}
</style>