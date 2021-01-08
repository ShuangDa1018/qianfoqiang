<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import test from './api/test';
export default {};
</script>
<style lang="less" scoped>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
/deep/.el-loading-spinner {
    margin-top: -15px;
    .circular {
        width: 30px;
        height: 30px;
    }
}
/deep/.el-container {
    height: 100%;
}
</style>
