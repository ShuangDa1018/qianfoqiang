<template>
    <div class="text-right">
        <el-pagination
            background
            :layout="layout?layout:lay"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 80, 100]"
            :page-size="pageSize"
            :total="total"
            :small="small?true:false"
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
        />
    </div>
</template>

<script>
export default {
    props: ['currentPage', 'pageSize', 'total','layout','small'],
    data(){
        return{
            lay:"sizes,total, prev, pager, next"
        }
    },
    methods: {
        /**
         * 改变页大小
         */
        onPageSizeChange(e) {
            this.$emit('sizeChange', e);
        },
        /**
         * 改变页
         */
        onPageChange(e) {
            this.$emit('pageChange', e);
        }
    }
};
</script>

<style></style>
