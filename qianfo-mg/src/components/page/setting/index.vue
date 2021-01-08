<template>
    <div class="bg-white p-10 cope_none parameter">
        <el-tabs v-model="activeName">
            <el-tab-pane
                :label="item.title"
                :name="item.title"
                v-for="item in settings"
                :key="item.name"
            >
                <setting-page :url="item.url" :defaultConfig="item.configs" :name="item.name"></setting-page>
            </el-tab-pane>
        </el-tabs>
        <div style="height:60px;width:100%;"></div>
    </div>
</template>
<script>
import settingPage from '../../view/settingPage.vue';
export default {
    components: {
        settingPage
    },
    data() {
        return {
            activeName: null,
            settings: []
        };
    },
    created() {
        this.getAllConfig();
    },
    methods: {
        getAllConfig() {
            let vm = this;
            let name =
                'com.cq1080.notification.mobile.MobileSmsConfig,com.cq1080.notification.baidu.BaiduSmsConfig,com.cq1080.notification.alibaba.AlibabaSmsConfig';
            this.$axios.get('config').then((it) => {
                vm.settings = it.filter((item) => {
                    return name.indexOf(item.name) < 0;
                });
                vm.activeName = vm.settings[0].title;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.parameter {
    height: calc(100vh - 120px) !important;
    position: relative;
    overflow: auto;
    padding: 30px;
    width: 100%;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #ddd;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
/deep/.el-tabs {
    width: 100%;
}
</style>