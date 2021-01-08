<template>
    <Dialog
        @close="close"
        :title="'导入'+title"
        :showStatus="showStatus"
        :width="width"
        :minWidth="minWidth"
        :buttonName="'导入'"
        :loading="saveLoading"
        @save="save"
    >
        <template slot="form">
            <div>
                <div>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :before-upload="previewFile"
                        :multiple="multiple"
                        :accept="accept"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传{{accept}}文件</div>
                    </el-upload>
                </div>
                <div class="upload-excel">
                    <div class="upload-excel-item" v-for="(item,index) in previewList" :key="index">
                        <div>{{item.name}}</div>
                        <div>{{item.size}}</div>
                        <div class="item-close" @click="delPreview(index)">
                            <i class="el-icon-close"></i>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <a :href="templateUrl" :download="templateName">
                <el-button type="primary" class="m-r-10">下载模板</el-button>
            </a>
            <el-button type="primary" :disabled="saveLoading" @click="save">导入</el-button>
        </template>
    </Dialog>
</template>

<script>
import Dialog from '../view/dialog';
export default {
    props: ['setting'],
    components: {
        Dialog
    },
    data() {
        return {
            title: '',
            showStatus: false,
            width: '20%',
            minWidth: '',
            multiple: false,
            accept: '.xls,.xlsx,.XLS,.XLSX',
            previewList: [],
            saveLoading: false,
            templateUrl: '',
            templateName: ''
        };
    },
    watch: {
        setting: {
            handler(val) {
                if (!val) {
                    return;
                }
                this.title = val.title;
                this.showStatus = val.showStatus;
                this.width = val.width;
                this.minWidth = val.minWidth;
                this.saveLoading = val.saveLoading;
                this.templateUrl = val.templateUrl;
                this.templateName = val.templateUrl.split('/')[1];
            },
            deep: true,
            immediate: true
        },
        showStatus(val) {
            if (!val) {
                this.previewList = [];
            }
        }
    },
    methods: {
        /**
         * 关闭
         */
        close() {
            this.$emit('close');
        },
        delPreview(e) {
            this.previewList.splice(e, 1);
        },
        /**
         * 预览上传的excel
         */
        previewFile(file, fileList) {
            console.log(file);
            let name = file.name.split('.')[1];
            if (this.accept.indexOf(name) < 0) {
                this.$message.warning('请上传正确的文件');
                return false;
            }
            this.previewList.unshift({
                file: file,
                name: file.name,
                size: this.$func.computedFileSize(file.size)
            });
            return false;
        },
        /**
         * 报存
         */
        save() {
            if (!this.previewList || !this.previewList.length) {
                this.$message.warning('请上传Excel文件');
                return;
            }
            let data = new FormData();
            let list = this.previewList.map((it) => {
                data.append('excel', it.file);
                return it.file;
            });
            this.$emit('success', data);
        }
    }
};
</script>

<style lang="less" scoped>
/deep/.el-upload {
    width: auto;
    height: auto;
    border: none;
}
.upload-excel {
    margin-top: 15px;
    max-height: 250px;
    overflow: auto;
    font-size: 12px;
    .upload-excel-item {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.2s ease-in-out;
        position: relative;
        overflow: hidden;
        .item-close {
            position: absolute;
            right: 0;
            transform: translateX(10px);
            transition: all 0.2s ease-in-out;
            opacity: 0;
            cursor: pointer;

            &:hover {
                color: #409eff;
            }
        }
        &:hover {
            padding-right: 40px;
            background-color: #f8f8f8;
            .item-close {
                transform: translateX(0px);
                opacity: 1;
            }
        }
    }
}
</style>