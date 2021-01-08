<template>
    <div>
        <el-upload
            v-if="!fileData&&!disabled"
            drag
            :multiple="false"
            :headers="headers"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :on-success="onSuccess"
            :accept="accept ? '.jpg,.jpeg,.gif,.png' : '.mp3,.mp4,.wma,.avi,.rm,.rmvb,.flv,.mpg,.mov,.mkv,.flac'"
            action="/manage/universal/upload"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
                只能上传{{ accept ? '.jpg,.jpeg,.gif,.png' : '.mp3,.mp4,.wma,.avi,.rm,.rmvb,.flv,.mpg,.mov,.mkv,.flac' }}文件
            </div>
        </el-upload>
        <div class="close">
            <div v-if="fileData">
                <div v-if="image" class="file-img">
                    <el-image
                        style="width: 70px; height: 70px; border-radius: 5px; z-index: 10"
                        :src="fileData"
                        :preview-src-list="[fileData]"
                    ></el-image>
                    <div class="preview-close-img" @click="close"><i class="el-icon-error"></i></div>
                </div>
                <div v-else class="file">
                    <span style="color: #cd8020">音乐地址:</span> {{ fileData }}
                    <div v-if="!disabled" class="preview-close" @click="close"><i class="el-icon-error"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['image', 'list', 'accept','disabled'],
    data() {
        return {
            fileData: '',
            max: 1,
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
        beforeUpload(flie, fileList) {},
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
/deep/.el-upload-dragger {
    width: 300px;
}
/deep/.el-upload--text {
    border: 0;
}
.file-img {
    position: relative;
    width: 70px;
    &:hover {
        .preview-close-img {
            opacity: 1;
            transform: translate(0);
        }
    }
}
.file {
    position: relative;
    width: 100%;
    overflow: hidden;
    // text-overflow: ellipsis;
    // white-space:nowrap; //禁止换行
    &:hover {
        .preview-close {
            opacity: 1;
            transform: translate(0);
        }
    }
}
.preview-close-img {
    cursor: pointer;
    position: absolute;
    font-size: 20px;
    left: 50px;
    top: -5px;
    color:rgba(0, 0, 0, 0.603);
    opacity: 0;
    transform: translate(10px);
    transition: all 0.15s;
    z-index: 100;
}
.preview-close {
    cursor: pointer;
    position: absolute;
    font-size: 25px;
    right: 0;
    top: 0;
    color: #f56c6c;
    opacity: 0;
    transform: translate(10px);
    transition: all 0.15s;
}
</style>>
