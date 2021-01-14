<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.BuddhaMusic'"
            @create="edit"
            @edit="edit"
            @delete='doDelete'
            @meta="meta"
            ref="list"
        >
        </List>
        <Dialog
            :showStatus="showStatus"
            @close="showStatus = false"
            :loading="loading"
            @save="save"
            :title="addInfo.id ? '编辑' : '新增'"
        >
            <template slot="form">
                <el-form :rules="rules" ref="form" :model="addInfo" label-width="60px">
                    <el-form-item label="标题" prop="name">
                        <el-input v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="buddhaMusicClassificationId">
                        <el-select v-model="addInfo.buddhaMusicClassificationId" style="width:100%">
                            <el-option v-for='item in options' :key='item.value' :value='item.value' :label='item.label'></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="排序" prop="sort">
                        <el-input v-model="addInfo.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="文件" prop="fileUrl">
                       <UploadFile :list='addInfo.fileUrl' @change='change'></UploadFile>
                    </el-form-item>
                </el-form>
            </template>
        </Dialog>
    </div>
</template>

<script>
import List from '@/components/view/ListT';
export default {
    components: {
        List,
        UploadFile:()=>import('@/components/common/uploadFile'),
        Dialog: () => import('@/components/view/dialog'),
    },
    data() {
        let check = (rule, value, callback)=>{
            if(this.$filter.checkPositiveInteger(value)){
                callback()
                return
            }callback( new Error('请输入正确的正整数'))
        }
        return {
            dataUrl: '/buddhamusic',
            showStatus: false,
            loading: false,
            addInfo: {},
            options:[],
            rules: {
                name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                buddhaMusicClassificationId: [{ required: true, message: '请输入分类', trigger: 'blur' }],
                sort: [{ required: true, message: '请输入排序', trigger: 'blur' },
                {validator:check,trigger:'blur'}],
                fileUrl: [{ required: true, message: '请输入上传文件', trigger: 'blur' }]
            }
        };
    },
    watch:{
        showStatus(val){
            if(!val){
                this.addInfo={}
            }   
        }
    },
    mounted(){
        this.getOptions()
    },
    methods: {
        meta(meta){
            meta.subs[10]=Object.assign({},meta.subs[6])
            meta.subs[10].key='fileUrl-1'
            meta.subs.forEach(it=>{
                if(it.key=='fileUrl-1'){
                    it.type='MUSICA'
                    it.name='佛乐'
                    it.sort=3
                }
                if(it.key=='buddhaMusicClassificationId'){
                    it.optionsUrl='universal/buddhaMusicClassificationList'
                }
            })
        },
        change(e){
            if(e){
                this.addInfo.fileUrl=e
                return
            }
            this.addInfo.fileUrl=''
        },
        getOptions(){
            this.$axios.get('universal/buddhaMusicClassificationList').then(res=>{
                this.options=res.content.map(it=>{
                    return {value:it.id, label:it.name}
                })
            })
        },
       //编辑新增
        edit(e) {
            if(e&&e.length){
            this.addInfo = Object.assign({},e[0])
            }
            this.showStatus = true;
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let query = { ...this.addInfo };
                    this.$axios
                        .post(this.dataUrl, this.addInfo)
                        .then((res) => {
                            this.$message.success(query.id ? '编辑成功' : '新增成功' );
                            this.loading = false;
                            this.showStatus = false;
                            this.$refs.list.doSearch()
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
        },
        //删除
        doDelete(e){ 
            this.$axios.delete(this.dataUrl,
            {params:{ids:e.map(it=>{return it.id}).join(',')}})
            .then(()=>{
                this.$message.success('删除成功')
                this.$refs.list.doSearch()
            })
        }
    }
};
</script>

<style>
</style>