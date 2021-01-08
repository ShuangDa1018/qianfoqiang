<template>
  <van-image-preview
    v-model="showStatus"
    :images="list"
    @close="onClose"
    @change="onChange"
  >
    <template v-slot:index>
      <span v-show="list && list.length > 1"> 第{{ index + 1 }}页 </span>
    </template>
  </van-image-preview>
</template>

<script>
import { ImagePreview } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      showStatus: false,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.preview.list,
      index: (state) => state.preview.index,
      show: (state) => state.preview.show,
    }),
  },
  watch: {
    show(val) {
      this.showStatus = val;
    },
  },
  methods: {
    onChange(index) {
      this.$store.commit("updateImagePreview", {
        list: this.list,
        index: index,
      });
    },
    onClose() {
      this.$store.commit("showImagePreview", {
        show: false,
      });
    },
  },
};
</script>

<style>
</style>