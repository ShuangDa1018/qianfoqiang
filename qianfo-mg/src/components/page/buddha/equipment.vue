<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.Equipment'"
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
                <el-form :rules="rules" ref="form" :model="addInfo" label-width="80px">
                    <el-form-item label="设备名称" prop="name">
                        <el-input v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属佛殿" prop="buddhaHallId">
                        <el-select v-model="addInfo.buddhaHallId" style="width:100%">
                            <el-option v-for="item in options " :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备账号" prop="username">
                        <el-input v-model="addInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="设备密码" prop="password">
                        <el-input v-model="addInfo.password"></el-input>
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
        Dialog: () => import('@/components/view/dialog')
    },
    data() {
        return {
            dataUrl: '/equipment',
            showStatus: false,
            loading: false,
            addInfo: {},
            rules: {
                name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
                buddhaHallId: [{ required: true, message: '请输入所属佛殿', trigger: 'blur' }],
                password: [{ required: true, message: '请输入设备密码', trigger: 'blur' }],
                username: [{ required: true, message: '请输入设备账号', trigger: 'blur' }]
            },
            options:[]
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
        this.getBuddha()
    },
    methods: {
        meta(meta){
            meta.subs.forEach(it=>{
                if(it.key=='buddhaHallId'){
                    it.optionsUrl='universal/buddhahalllist'
                }
            })
        },
        getBuddha(){
            this.$axios.get('buddhahall').then(res=>{
                console.log(res)
                this.options=res.content.map(it=>{
                    return {value:it.id,label:it.name}
                })
            })
        },
       //编辑新增
        edit(e) {
            if(e&&e.length){
            console.log(e)
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