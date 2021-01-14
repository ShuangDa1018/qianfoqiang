<template>
    <div>
        <div class="main">
            <el-form class="form" :model="addInfo" :rules="rules" label-width="120px" ref="form">
                <el-form-item label="佛乐播放方式" prop="buddhaMusicMethod">
                    <el-select
                        v-model="addInfo.buddhaMusicMethod"
                        style="width: 350px"
                        @change="changeSelect('buddhaMusicClassificationId', 'buddhaMusics', 0)"
                    >
                        <el-option v-for="item in opMusic1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="addInfo.buddhaMusicMethod == 'SPECIFY'" label="佛乐分类">
                    <el-select v-model="addInfo.buddhaMusicClassificationId" @change="changeOption('buddhaMusics')" style="width: 350px">
                        <el-option v-for="item in options[0]" :key="item.id" :value="item.id" :label="item.name"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="佛乐" v-show="addInfo.buddhaMusicClassificationId">
                    <el-checkbox :indeterminate="isIndeterminate0" v-model="checkAll0" @change="changeAll0">全部</el-checkbox>
                    <el-checkbox-group v-model="addInfo.buddhaMusics" style="width: 350px" @change="changeGroup0">
                        <el-checkbox v-for="item in checkList[0]" :key="item.id" :label="item.fileUrl">{{ item.name }} </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="祝福语播放方式" prop="buddhaLanguageMethod">
                    <el-select
                        v-model="addInfo.buddhaLanguageMethod"
                        style="width: 350px"
                        @change="changeSelect('buddhaLanguageClassificationId', 'buddhaLanguages', 1)"
                    >
                        <el-option v-for="item in opMusic2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="addInfo.buddhaLanguageMethod == 'SPECIFY'" label="祝福语分类">
                    <el-select
                        v-model="addInfo.buddhaLanguageClassificationId"
                        @change="changeOption('buddhaLanguages')"
                        style="width: 350px"
                    >
                        <el-option v-for="item in options[1]" :key="item.id" :value="item.id" :label="item.name"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="祝福语" v-show="addInfo.buddhaLanguageClassificationId">
                    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="changeAll1">全部</el-checkbox>
                    <el-checkbox-group v-model="addInfo.buddhaLanguages" style="width: 350px" @change="changeGroup1">
                        <el-checkbox v-for="item in checkList[1]" :key="item.id" :label="item.content" >{{ item.name }} </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="!noSave" label="播放开始时间" prop='playStartTime'>
                       <el-date-picker
                       style="width: 350px"
                            v-model="addInfo.playStartTime"
                            type="datetime"
                            value-format="timestamp"
                            align="right">
                            </el-date-picker>
                </el-form-item>
                 <el-form-item v-if="!noSave" label="播放结束时间" prop='playEndTime'>
                       <el-date-picker
                            style="width: 350px"
                            v-model="addInfo.playEndTime"
                            type="datetime"
                            value-format="timestamp"
                            align="right">
                            </el-date-picker>
                </el-form-item>
                <div v-if="!noSave" class="footer-button">
                    <el-button :loading='loading' type="primary" @click="save">保存</el-button>
                    <el-button :loading='loading' @click="$emit('getFestical')">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['addInfo', 'noSave'],
    data() {
        return {
            // addInfo: {},
            isIndeterminate0:true,
            isIndeterminate1:true,
            checkAll0:false,
            checkAll1:false,
            loading:false,
            options: [],
            checkList: [],
            Arr: [],
            opMusic1: [
                { value: 'RANDOM', label: '随机播放' },
                { value: 'SPECIFY', label: '指定佛乐' }
            ],
            opMusic2: [
                { value: 'RANDOM', label: '随机播放' },
                { value: 'SPECIFY', label: '指定祝福语' }
            ],
            optionUrl: ['buddhamusicclassification', 'buddhalanguageclassification'],
            optionUrl2: ['buddhamusic', 'buddhalanguage'],
            //佛乐分类  佛乐  祝福语分类  祝福语
            rules: {
                buddhaMusicMethod: [{ required: true, message: '请选择佛乐播放方式', trigger: 'blur' }],
                buddhaLanguageMethod: [{ required: true, message: '请选择祝福语播放方式', trigger: 'blur' }],
                playStartTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
                playEndTime: [{ required: true, message: '请选择介绍时间', trigger: 'blur' }]
            }
        };
    },
    watch: {
        'addInfo.buddhaMusicClassificationId': {
            handler(val) {
                this.getOptions2('buddhamusic', 'buddhaMusicClassificationId', val, 0);
            },
            deep: true,
            immediate: true
        },
        'addInfo.buddhaLanguageClassificationId': {
            handler(val) {
                this.getOptions2('buddhalanguage', 'buddhaLanguageClassificationId', val, 1);
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // this.getFestical();
        this.setOptions();
    },
    methods: {
        // 全选
        changeAll0(val){
            let list =  this.checkList[0].map(it=>{
                return it.fileUrl
            })
            console.log(list)
            this.addInfo.buddhaMusics= val?list:[]
            this.isIndeterminate0 = false
        },
        changeGroup0(value){
            let length = value.length
            this.checkAll0 = length === this.checkList[0].length;
            this.isIndeterminate0 = length > 0 && length < this.checkList[0].length
        },
        // 全选
        changeAll1(val){
            
            let list =  this.checkList[1].map(it=>{
                return it.content
            })
            console.log(list)
            this.addInfo.buddhaLanguages= val?list:[]
            this.isIndeterminate1 = false
        },
        changeGroup1(value){
            let length = value.length
            this.checkAll1 = length === this.checkList[1].length;
            this.isIndeterminate1 = length > 0 && length < this.checkList[1].length
        },
        //保存
        save() {
            this.loading=true
            this.$axios.post('buddhafestival', this.addInfo).then((res) => {
                this.$message.success('保存成功');
                this.$emit('getFestical')
                this.loading=false
            }).catch(arr=>{
                this.loading=false
            })
        },
        // 获取佛乐
        getOptions2(url, id, type, i) {
            let query = {};
            query[id] = type;
            this.$axios.get(url, { params: query }).then((res) => {
                this.$set(this.checkList, i, res.content);
            });
        },
        changeSelect(name, name2, index) {
            console.log(1)
            this.addInfo[name] = null;
            this.addInfo[name2] = [];
            this.checkList[index] = [];
        },
        changeOption(name, index) {
            this.addInfo[name] = [];
        },
        // 设置 分类
        setOptions() {
            this.optionUrl.forEach((it, i) => {
                this.getOptions(it, i);
            });
        },
        // 获取分类
        getOptions(it, i) {
            this.$axios.get(it).then((res) => {
                this.$set(this.options, i, res.content);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.main {
    background: #fff;
    // padding: 20px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
}
.form-box-title {
    font-size: 14px;
    font-weight: bold;
    background-color: #f8f8f8;
    height: 40px;
    line-height: 40px;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding-left: 50px;
    margin-bottom: 30px;
}
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.footer-button {
    // display: flex;
    // justify-content: center;
}
</style>
