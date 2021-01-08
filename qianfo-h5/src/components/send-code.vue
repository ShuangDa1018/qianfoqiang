<template>
  <div class="send-code" @click="sendCode">{{ name }}</div>
</template>

<script>
import filter from "@/utils/filter.js";
export default {
  props: ["url", "defaultTime", "phone", "defaultName"],
  data() {
    return {
      time: 60,
      timeOut: 60,
      name: "获取验证码",
    };
  },
  watch: {
    defaultTime: {
      handler(val) {
        this.timeOut = val;
      },
      immediate: true,
    },
    defaultName: {
      handler(val) {
        this.name = val;
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * 发送验证码
     */
    sendCode() {
      if (this.name != this.defaultName) {
        return;
      }
      if (!this.phone) {
        this.$toast("请输入联系电话");
        return;
      }
      if (!filter.checkPhone(this.phone)) {
        this.$toast("请输入正确的联系电话");
        return;
      }
      this.$toast.loading({
        message: "发送中...",
        forbidClick: true,
      });
      this.$axios
        .get(this.url, {
          phone: this.phone,
        })
        .then((res) => {
          this.$toast.success("发送成功");
          this.setName();
        })
        .catch((err) => {
          this.$toast.success("发送失败");
        });
    },
    setName() {
      let time = this.timeOut;
      let timer = setInterval((it) => {
        time--;
        if (time <= 0) {
          clearInterval(timer);
          this.name = this.defaultName;
          this.timeOut = 60;
        } else {
          this.name = time + "S后获取";
          this.timeOut = time;
        }
      }, 1000);
    },
  },
};
</script>

<style>
.send-code {
  font-size: 14px;
  min-width: 80px;
  text-align: right;
  line-height: 20px;
  height: 100%;
  color: #35c9af;
  opacity: 1;
}
</style>