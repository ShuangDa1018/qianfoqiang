<template>
    <el-popconfirm :title="tip ? tip : '确认删除？'" confirmButtonText="是" cancelButtonText="否" @onConfirm="onConfirm" placement="top">
        <el-button
            slot="reference"
            :type="type ? type : 'danger'"
            :size="size ? size : 'mini'"
            :style="{ color: color ? color : '' }"
            :loading="loading"
            >{{ name ? name : '删除' }}</el-button
        >
    </el-popconfirm>
</template>
<script>
export default {
    props: ['tip', 'size', 'loading', 'name', 'type', 'color'],
    methods: {
        onConfirm() {
            this.$emit('delete');
        }
    }
};
</script>
<style scoped></style>
