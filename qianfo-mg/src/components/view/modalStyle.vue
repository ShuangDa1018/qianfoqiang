<template>
    <div class="modal">
        <div class="modal-content"></div>
    </div>
</template>

<script>
export default {
    props: ['width'],
    computed: {
        bodyWidth() {
            return this.$props.width.indexOf('%')>-1?this.$props.width:this.$props.width+'px';
        }
    }
};
</script>

<style lang="less" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    .modal-content {
        background-color: white;
    }
}
</style>