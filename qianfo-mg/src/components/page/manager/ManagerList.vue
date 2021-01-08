<template>
    <div>
        <List
            :dataUrl="'/rewrite/manager'"
            :metaUrl="'com.cq1080.auth.bean.Manager'"
            :tableData="tableData"
            @delete="deleteManager"
            @create="openCreate"
            @edit="editManager"
            @meta="getMeta"
            ref="list"
        >
            <template slot="addition-table-actions" slot-scope="scope">
                <el-button type="primary" @click="openPermission(scope.item.row)">查看权限</el-button>
            </template>
        </List>

        <Dialog
            :showStatus="createDialog"
            title="编辑管理员"
            @save="saveManager"
            :width="'35%'"
            :loading="manager.loading"
            @close="createDialog=false;"
        >
            <template slot="form">
                <el-form  label-width="110px">
                    <el-form-item label="用户名">
                        <el-input placeholder="用户名" v-model="manager.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input placeholder="登录账号" v-model="manager.mobile" type="mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码">
                        <el-input placeholder="登录密码" v-model="manager.password" type="password"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="用户角色"  v-if="createDialog&&!manager.buddhaHallId">
                        <div class="el-input">
                            <el-checkbox
                                :label="role.name"
                                v-for="role in roles"
                                :key="role.id"
                                :checked="role.check"
                                @change="onRoleChange($event, role)"
                            ></el-checkbox>
                            <div style="color:#999">总平台超级管理员选择</div>
                        </div>
                    </el-form-item>
                     <el-form-item label="子平台管理员">
                        <el-select v-model="manager.buddhaHallId"  filterable  style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div style="color:#999">子平台超级管理员选择</div>
                    </el-form-item>
                    <!-- <el-button type="primary" @click="saveManager" :loading="manager.loading">保存</el-button> -->
                </el-form>
            </template>
        </Dialog>

        <Dialog
            :hiddenFooter="true"
            :showStatus="showPermission"
            @close="showPermission=false"
            width="40%"
            :minWidth="813"
            title="查看权限"
        >
            <template slot="form">
                <permission :manager="currentManager.id"></permission>
            </template>
        </Dialog>
   
    </div>
</template>

<script>
import List from '../../view/ListT';
import Vue from 'vue';
import Permission from '../auth/permission';
import Dialog from '../../view/dialog';
export default {
    components: { List, Permission, Dialog },
    data() {
        return {
            filter: { bb: 'bb' },
            createDialog: false,
            tableData: {},
            tableMeta: {},
            roles: [],
            url:'',
            manager: {},
            showPermission: false,
            currentManager: {},
            station: {
                detentionCenterId: '',
                detentionCenterName: ''
            },
            options:[],
        };
    },
    watch: {
        createDialog(val) {
            if (val) {
                this.$forceUpdate();
                return;
            }
            if (!val) {
                this.selectStation = '';
            }
            this.manager = {};
            this.roles = this.roles.map((it) => {
                Vue.set(it, 'check', false);
                return it;
            });
        },
        'manager.buddhaHallId': {
            handler(val){
                if(val){
                    this.manager.roles=[]
                    this.url='manager/sub'
                }
                else{
                    this.url=''
                }
            },
            deep:true
        }
        
    },
    created() {
        this.getAllRole();
        this.getOptions()
    },
    methods: {
        getOptions(){
            this.$axios.get('universal/buddhahalllist').then(res=>{
                this.options=res.content.map(it=>{
                    return {value:it.id,label:it.name}
                })
            })
        },
        /**
         * 修改meta
         */
        getMeta(meta) {
            meta.subs.push({key:'type',name:'身份',displayInList:true,sort:6})
            meta.subs.forEach((it) => {
                if(it.key == 'tag'){
                    it.displayInList=false
                }
                if(it.key == 'type'){
                    console.log(1)
                    it.searchOption=[
                         {key:'SUB_SUPER_MANAG',name:'子平台超级管理员',color:'#cd8020'},
                         {key:'SUPER_MANAGER',name:'超级管理员',color:'#67c23a'},
                         {key:'MANAGER',name:'总平台管理员'},
                    ]
                }
            })
        },
        openCreate(e) {
            this.createDialog = true;
        },

        openPermission(item) {
            this.currentManager = item;
            this.showPermission = true;
        },
        onRoleChange(e, role) {
            Vue.set(role, 'check', e);
            this.manager.roles = this.roles.filter((it) => {
                return it.check;
            });
        },
        getAllRole() {
            this.$axios.get('auth/role', { params: { size: 100000 } }).then((it) => {
                this.roles = it.content;
            });
        },
        editManager(e) {
            this.manager = Object.assign({}, this.manager, e[0]);
            this.createDialog = true;
            let manager = this.manager;
            this.roles = this.roles.map((it) => {
                it.check =
                    manager.roles.filter((item) => {
                        return item.id == it.id;
                    }).length > 0;
                return it;
            });
            this.$forceUpdate();
        },
        saveManager() {
            let manager = this.manager;
            if (!this.manager.name) {
                this.toast('请输入名称');
                return;
            }
            if (!this.manager.mobile) {
                this.toast('请输入登录账号');
                return;
            }
            if (!this.manager.password && !this.manager.id) {
                this.toast('请输入登录密码');
                return;
            }
            if ((!this.manager.roles || !this.manager.roles.length)&&!this.manager.buddhaHallId) {
                this.toast('请选择角色');
                return;
            }
            this.manager.active = true;
            this.selfLoading(this.manager, true);
            this.$axios
                .post(this.url?this.url:'manager', manager)
                .then((it) => {
                    this.selfLoading(this.manager, false);
                    this.createDialog = false;
                    if (manager.id) {
                        this.$refs.list.onUpdate([it]);
                        return;
                    }
                    this.$refs.list.onAdd(it);
                })
                .catch((it) => {
                    this.selfLoading(this.manager, false);
                });
        },
        deleteManager(manager) {
            this.startLoading();
            this.$axios
                .delete(
                    'manager?ids=' +
                        manager
                            .map((it) => {
                                return it.id;
                            })
                            .join(',')
                )
                .then((it) => {
                    this.stopLoading();
                    this.$refs.list.onDeleted(manager);
                })
                .catch((it) => {
                    this.stopLoading();
                });
        }
    }
};
</script>
<style lang="less" scoped>

</style>
