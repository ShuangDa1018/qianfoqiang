<template>
    <div class="background">
        <el-tabs v-model="activeName">
            <el-tab-pane label="广告屏设置" name="first">
                <el-form :model="addInfo" ref="form1" :rules="rules" label-width="120px">
                    <el-form-item label="屏幕标题" prop="advertisingScreenTitle">
                        <el-input v-model="addInfo.advertisingScreenTitle" :disabled="editable_1"></el-input>
                    </el-form-item>
                    <el-form-item label="屏幕广告图" prop="advertisingScreenImage">
                        <Upload-img
                            :list="addInfo.advertisingScreenImage"
                            @change="change($event, 'advertisingScreenImage')"
                            :disabled="editable_1"
                        ></Upload-img>
                    </el-form-item>
                    <el-form-item label="捐款成功标题" prop="donateSuccessTitle">
                        <el-input v-model="addInfo.donateSuccessTitle" :disabled="editable_1"></el-input>
                    </el-form-item>
                    <el-form-item label="捐款成功佛像" prop="donateSuccessImage">
                        <Upload-img
                            :list="addInfo.donateSuccessImage"
                            @change="change($event, 'donateSuccessImage')"
                            :disabled="editable_1"
                        ></Upload-img>
                    </el-form-item>
                    <el-form-item label="捐款成功佛乐" prop="donateSuccessMusic">
                        <!-- <el-input v-model="addInfo.donateSuccessMusic" :disabled="editable_1"></el-input> -->
                            <UploadFile :list='addInfo.donateSuccessMusic' @change="change($event, 'donateSuccessMusic') " :disabled="editable_1"></UploadFile>
                    </el-form-item>
                    <el-form-item>
                        <div v-if="!editable_1">
                            <el-button type="primary" @click="doSubmit">保存</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </div>
                        <el-button v-else type="primary" @click="editable_1 = false">编辑</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="千佛墙设置" name="second">
                <el-form :model="addInfo" ref="form1" :rules="rules" label-width="120px">
                    <el-form-item label="千佛墙标题" prop="buddhaWallTitle">
                        <el-input v-model="addInfo.buddhaWallTitle" :disabled="editable_2"></el-input>
                    </el-form-item>
                    <el-form-item label="动图" prop="buddhaWallImage">
                        <Upload-img
                            :list="addInfo.buddhaWallImage"
                            @change="change($event, 'buddhaWallImage')"
                            :disabled="editable_2"
                        ></Upload-img>
                    </el-form-item>
                    <el-form-item>
                        <div v-if="!editable_2">
                            <el-button type="primary" @click="doSubmit">保存</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </div>
                        <el-button v-else type="primary" @click="editable_2 = false">编辑</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="捐款设置" name="three">
                <el-form :model="addInfo" ref="form1" :rules="rules" label-width="120px">
                    <el-form-item label="捐款标题" prop="donateTitle">
                        <el-input v-model="addInfo.donateTitle" :disabled="editable_3"></el-input>
                    </el-form-item>
                    <el-form-item label="轮播图" prop="donateImages">
                        <Upload-array
                            :list="addInfo.donateImages"
                            @change="change1"
                            :disabled="editable_3"
                            :maxLength="6"
                        ></Upload-array>
                    </el-form-item>
                    <el-form-item label="捐款感谢语" prop="donateThanks">
                        <el-input v-model="addInfo.donateThanks" type="textarea"   :autosize="{ minRows: 2, maxRows: 10}" :disabled="editable_3"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div v-if="!editable_3">
                            <el-button type="primary" @click="doSubmit">保存</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </div>
                        <el-button v-else type="primary" @click="editable_3 = false">编辑</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        UploadImg: () => import('@/components/common/uploadImg'),
        UploadArray: () => import('@/components/common/uploadArray'),
        UploadFile: () => import('@/components/common/uploadFile')
    },
    data() {
        return {
            addInfo: {},
            activeName: 'first',
            editable_1: true,
            editable_2: true,
            editable_3: true,
            rules: {
                // advertisingScreenTitle: [{ required: true, message: '请输入屏幕标题', trigger: 'blur' }],
                // advertisingScreenImage: [{ required: true, message: '请输入屏幕广告图', trigger: 'blur' }],
                // donateSuccessTitle: [{ required: true, message: '请输入捐款成功标题', trigger: 'blur' }],
                // donateSuccessImage: [{ required: true, message: '请输入捐款成功佛像', trigger: 'blur' }],
                // donateSuccessMusic: [{ required: true, message: '请输入捐款成功佛乐', trigger: 'blur' }],
            
                // buddhaWallTitle: [{ required: true, message: '请输入千佛墙标题', trigger: 'blur' }],
                // buddhaWallImage: [{ required: true, message: '请输入动图', trigger: 'blur' }],

                // donateTitle: [{ required: true, message: '请输入捐款标题', trigger: 'blur' }],
                // donateImages: [{ required: true, message: '请输入轮播图', trigger: 'blur' }],
                // donateThanks: [{ required: true, message: '请输入捐款感谢语', trigger: 'blur' }]
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            this.$axios.get('bd/buddhahallinfo').then((res) => {
                this.addInfo = res;
            });
        },
        //取消
        cancel() {
            this.getData();
            this.editable_1 = true;
            this.editable_2 = true;
            this.editable_3 = true;
        },
        //保存
        doSubmit() {
            this.$refs.form1.validate((valid) => {
                if (valid) {
                 this.loading = true;
                    this.$axios
                        .post('bd/buddhahallinfo', this.addInfo)
                        .then((res) => {
                            this.loading = false;
                            this.$message.success('保存成功');
                            this.getData()
                            this.editable_1 = true;
                            this.editable_2 = true;
                            this.editable_3 = true;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
        },
        change(val, name) {
            this.addInfo[name] = val;
        },
        change1(e){
          this.addInfo.donateImages=e
        }
    }
};
</script>

<style scoped lang='less'>
/deep/.el-form {
    /deep/.el-input__inner,
    /deep/.el-textarea__inner,
    /deep/.el-date-editor {
        width: 400px;
    }
}
</style>