<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <slot v-bind:item="item"> </slot>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { List, PullRefresh } from "vant";

export default {
  name: "list-loading",
  props: ["bgColor"],
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  data() {
    return {
      refreshing: false /** 刷新 */,
      finished: false /** 结束 */,
      loading: false /** 加载loading */,
      list: [] /** 列表内容 */,
    };
  },
  watch: {
    bgColor: {
      handler(val) {
        this.$nextTick(() => {
          let refresh = document.querySelector(".van-pull-refresh");
          refresh.style.backgroundColor = val;
        });
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * 下拉刷新，清空列表
     */
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    /**
     * 触底加载
     */
    onLoad() {
      this.$emit("onLoad");
      setTimeout(() => {
        if (this.refreshing) {
          //上拉刷新中
          this.list = [];
          this.refreshing = false;
        }
        //调用加载数据
        for (let i = 0; i < 10; i++) {
          this.list.push({
            status: i % 2 == 0 ? true : false,
          });
          this.loading = false;
        }
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style>
</style>