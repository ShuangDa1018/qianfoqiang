<template>
    <div>
        <el-upload
            v-if="!fileData"
            :headers="headers"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :on-success="onSuccess"
            :accept="accept"
            action="manage/universal/upload"
        >
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip">只能上传{{ accept }}图片</div>
        </el-upload>
        <div class="preview-item" v-if="fileData">
            <el-image style="width: 77px; height: 77px; border-radius: 5px" :src="fileData" :preview-src-list="[fileData]"></el-image>
            <div v-if="!disabled" class="preview-close" @click="close">
                <i class="el-icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['list','disabled',],
    data() {
        return {
            fileData: '',
            accept: '.jpg,.jpeg,.gif,.png',
            headers: { accessToken: JSON.parse(localStorage.getItem(process.env.VUE_APP_PROJECTNAME + '_user')).token }
        };
    },
    watch: {
        list: {
            handler(val) {
                this.fileData = val;
            },
            deep: true,
            immediate: true
        },
        fileData: {
            handler(val) {
                this.$emit('change', val);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        beforeUpload(flie, fileList) {
        },
        onSuccess(response, file, fileList) {
            console.log(response, file);
            this.fileData = response.data;
        },
        close(i) {
            this.fileData = '';
        }
    }
};
</script>

<style lang="less" scoped>
/deep/.el-upload--text {
    width: 77px;
    height: 77px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.preview-item {
    display: flex;
    width: 77px;
        position: relative;
        &:hover {
            .preview-close {
                display: block;
            }
        }
    }
    .preview-close {
        position: absolute;
        right: -3px;
        top: -4px;
        width: 15px;
        height: 15px;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 100%;
        color: white;
        font-size: 10px;
        line-height: 15px;
        text-align: center;
        display: none;
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.75);
        }
    }
    .preview-img {
        width: 77px;
        height: 77px;
        line-height: 77px;
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        animation: imgshow 0.25s ease-in-out;
    }
</style>>
