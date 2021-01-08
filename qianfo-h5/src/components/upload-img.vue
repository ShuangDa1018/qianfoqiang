<template>
  <div class="upload-img" :class="custom ? 'custom' : ''">
    <van-uploader
      v-model="imgList"
      :max-count="max"
      :after-read="afterRead"
      :before-read="beforeRead"
    >
      <slot></slot>
    </van-uploader>
  </div>
</template>

<script>
import { Uploader } from "vant";
export default {
  name: "upload-img",
  props: ["max", "url", "custom"],
  components: {
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      imgList: [] /** 已上传文件列表 */,
    };
  },
  methods: {
    /**
     * 获取上传内容
     */
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      console.log(file);
      let formData = new FormData();
      formData.append("file", file.file);
      this.$axios
        .post(this.url, formData)
        .then((res) => {
          console.log(res);
          file.status = "done";
          file.message = "上传成功";
          file.url = res.data;
          this.$emit("success", this.imgList);
        })
        .catch((err) => {
          file.status = "failed";
          file.message = "上传失败";
        });
    },
    /**
     * 上传
     * 前置处理
     */
    beforeRead(file) {
      console.log(file);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("请上传 jpg、png 格式图片");
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.upload-img {
  width: 100%;
  height: 100%;
}
.custom .van-uploader {
  width: 100%;
  height: 100%;
}
.custom .van-uploader__wrapper {
  width: 100%;
  height: 100%;
}
.custom .van-uploader .van-uploader__preview {
  width: 100%;
  height: 100%;
  margin: 0;
}
.custom .van-uploader__preview-image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>