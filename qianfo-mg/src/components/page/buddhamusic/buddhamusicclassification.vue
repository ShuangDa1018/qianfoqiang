<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.BuddhaMusicClassification'"
            @create="edit"
            @edit="edit"
            @delete='doDelete'
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
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="addInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="addInfo.sort"></el-input>
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
            dataUrl: '/buddhamusicclassification',
            showStatus: false,
            loading: false,
            addInfo: {},
            rules: {
                name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
                sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
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
    methods: {
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