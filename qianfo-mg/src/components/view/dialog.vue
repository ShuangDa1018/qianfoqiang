<template>
    <el-dialog
        class="dialog-model"
        ref="dialog"
        :title="title"
        :visible.sync="showStatus"
        :width="width ? width : '30%'"
        :close-on-press-escape="false"
        :before-close="handleClose"
        :append-to-body="appendToBody"
        :close-on-click-modal="false"
        :modal-append-to-body="!modalAppendToBody"
    >
        <div class="body" v-if="!hiddenBody">
            <slot name="form"></slot>
        </div>
        <div class="table">
            <slot name="table"></slot>
        </div>
        <div class="dialog-footer" v-loading="loading" v-if="!hiddenFooter">
            <slot name="footer">
                <el-button type="primary" :disabled="loading" @click="save">{{ buttonName ? buttonName : '确 定' }}</el-button>
            </slot>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: [
        'modal-append-to-body',
        'appendToBody',
        'zIndex',
        'modal',
        'loading',
        'title',
        'showStatus',
        'width',
        'minWidth',
        'hiddenFooter',
        'hiddenBody',
        'buttonName'
    ],
    data() {
        return {};
    },
    methods: {
        handleClose() {
            this.$emit('close');
        },
        save() {
            this.$emit('save');
        }
        // beforeClose(done) {
        //     done();
        // }
    },
    watch: {
        minWidth: {
            handler(val) {
                if (val) {
                    this.$nextTick(() => {
                        let dia = document.querySelector('.dialog-model .el-dialog');
                        dia.style.minWidth = val + 'px';
                    });
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
// .dialog-model {
//     z-index: 1997 !important;
// }
/deep/.el-dialog__header {
    padding: 15px 20px;

    .el-dialog__title {
        font-size: 16px;
    }
}
/deep/.el-dialog__body {
    position: relative;
    padding-bottom: 60px;
    .body {
        min-height: 200px;
        max-height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
// /deep/.el-form-item--small.el-form-item {
//     display: flex;
//     .el-form-item__label {
//         width: 100px;
//     }
//     .el-form-item__content {
//         flex: 1;
//     }
// }
.dialog-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;
    text-align: right;
}
</style>
