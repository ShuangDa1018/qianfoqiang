<template>
    <div class="cope_none">
        <el-row>
            <el-col :span="12">
                <el-form
                    label-position="top"
                    label-width="80px"
                    :model="formModel"
                    :rules="rules"
                    ref="formModel"
                    :disabled="!editable"
                >
                    <el-form-item
                        v-for="item in config"
                        :key="item.name"
                        :label="item.title+' ('+item.description+')'"
                        :prop="item.name"
                    >
                        <!-- <quill-editor
                            ref="myTextEditor"
                            v-model="formModel[item.name]"
                            v-if="item.type =='MEDIA_TEXT'"
                            :disabled="!editable"
                        ></quill-editor>-->

                        <Vue-editor
                            v-model="formModel[item.name]"
                            v-if="item.type =='MEDIA_TEXT'"
                            :num="item.name"
                            :disabled="!editable"
                        ></Vue-editor>

                        <el-input
                            v-model="formModel[item.name]"
                            :placeholder="item.title"
                            :type="item.type"
                            v-else
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submit('formModel')"
                            v-if="editable"
                            :loading="loading"
                        >保存</el-button>
                        <el-button @click="cancelEdit" v-if="editable" :disabled="loading">取消</el-button>
                    </el-form-item>
                </el-form>
                <el-button @click="editable=true" v-if="!editable" type="primary">编辑</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Vue from 'vue';
import VueEditor from './editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'settingPage',
    props: ['url', 'defaultConfig', 'name'],
    components: {
        VueEditor
    },
    data() {
        return {
            editable: false,
            rules: {},
            config: [],
            loading: false,
            formModel: {}
        };
    },
    created() {
        this.updateModelValue();
    },
    watch: {
        defaultConfig: {
            deep: true,
            immediate: true,
            handler(val) {
                this.config = val;
                this.updateModelValue();
            }
        }
    },
    methods: {
        cancelEdit() {
            this.updateModelValue();
            this.editable = false;
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.doSubmit();
                } else {
                    return false;
                }
            });
        },
        doSubmit() {
            let vm = this;
            vm.loading = true;
            this.$axios.post('config?configName=' + this.name, this.formModel).then((it) => {
                //console.log(this.formModel);
                vm.config = it;
                vm.updateRules();
                vm.updateModelValue();
                vm.loading = false;
                vm.editable = false;
                vm.$message.success({ message: '修改成功' });
            });
        },
        updateModelValue() {
            this.config.forEach((it) => {
                Vue.set(this.formModel, it.name, it.value);
                // console.log(this.formModel)
                // this.formModel[it.name] = it.value;
            });
        },
        updateRules() {
            this.config.forEach((it) => {
                let rules = [];
                if (it.required) {
                    rules.push({
                        required: true,
                        message: it.title + '不能为空',
                        trigger: 'blur'
                    });
                }
                this.rules[it.name] = rules;
            });
        },
        get() {
            console.log(this.formModel);
        }
    }
};
</script>
<style scoped>
.el-input {
    max-width: 20rem;
}
</style>