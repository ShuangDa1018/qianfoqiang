<template>
    <div>
        <div class="main">
            <div class="form-box-title">佛教节日设置</div>
            <Form-date :addInfo='addInfo' @getFestical='getFestical'></Form-date>
        </div>
    </div>
</template>

<script>
export default {
    components:{
        FormDate: () => import('@/components/page/common/formDate')
    },
    data() {
        return {
            addInfo: {},
        };
    },
    created() {
        this.getFestical();
    },
    methods: {
        // 当前数据
        getFestical() {
            this.$axios.get('buddhafestival').then((res) => {
                this.addInfo = res;
            });
        },
        
    }
};
</script>

<style lang="less" scoped>
.main {
    background: #fff;
    // padding: 20px;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.form-box-title {
    margin: 20px;
    font-size: 14px;
    font-weight: bold;
    // box-sizing: border-box;
    background-color: #f8f8f8;
    height: 40px;
    line-height: 40px;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding-left: 50px;
    margin-bottom: 30px;
}

</style>
