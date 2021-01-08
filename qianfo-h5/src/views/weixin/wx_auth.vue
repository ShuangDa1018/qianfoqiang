<template>
  <div class="content">
    <img class="buddha-img m-b-30" src="~@/assets/images/need-delete.png" alt="" />
    <div class="background">
      <!-- <img
        ref="img"
        class="back-img"
        src="~@/assets/images/paySuccess.png"
        alt=""
      /> -->
      <div class="img-text" ref="text">
        <div class="text f-s-22 " >
          请用微信扫码登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  mounted() {
    console.log(this.$refs.img.style);
  },
  methods: {
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
  height: auto;
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
/* .img-text { */
  /* position: absolute;
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
  overflow-y: scroll;
}
.ceshi {
  background: rgb(0, 255, 136);
}
.text {
  text-align: center;
} */
</style>