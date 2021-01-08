<template>
    <div>
        <List
            :dataUrl="'bd/rewrite/manager'"
            :metaUrl="'com.cq1080.auth.bean.Manager'"
            :tableData="tableData"
            @delete="deleteManager"
            @create="openCreate"
            @edit="editManager"
            @meta="getMeta"
            ref="list"
            :axiosQuery="{tag:'buddhahall'}"
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
                    <!-- <el-form-item label="佛殿超级管理员">
                        <el-select v-model="manager.buddhaHallId"  filterable clearable style="width:100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="用户角色" v-if="createDialog">
                        <div class="el-input">
                            <el-checkbox
                                :label="role.name"
                                v-for="role in roles"
                                :key="role.id"
                                :checked="role.check"
                                @change="onRoleChange($event, role)"
                            ></el-checkbox>
                        </div>
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
import List from '@/components/view/ListT';
import Vue from 'vue';
import Permission from './permission';
import Dialog from '@/components/view/dialog';
export default {
    components: { List, Permission, Dialog },
    data() {
        return {
            filter: { bb: 'bb' },
            createDialog: false,
            tableData: {},
            tableMeta: {},
            roles: [],
            manager: {},
            showPermission: false,
            currentManager: {},
            station: {
                detentionCenterId: '',
                detentionCenterName: ''
            },
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
        }
    },
    created() {
        this.getAllRole();
    },
    methods: {
        /**
         * 修改meta
         */
        getMeta(meta) {
             console.log(meta)
            meta.subs.push({key:'type',name:'身份',displayInList:true,sort:6})
            console.log(meta.subs)
            meta.subs.forEach((it) => {
                if(it.key == 'tag'){
                    it.displayInList=false
                }
                if(it.key == 'type'){
                    console.log(1)
                    it.searchOption=[
                         {key:'SUB_SUPER_MANAG',name:'子平台超级管理员',color:'#cd8020'},
                         {key:'SUPER_MANAGER',name:'超级管理员',color:'#67c23a'},
                         {key:'MANAGER',name:'管理员'},
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
            this.$axios.get('bd/rewrite/auth', { params: { size: 100000 } }).then((it) => {
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
            if (!this.manager.roles || !this.manager.roles.length) {
                this.toast('请选择角色');
                return;
            }
            this.manager.active = true;
            this.selfLoading(this.manager, true);
            this.$axios
                .post('bd/rewrite/manager', manager)
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
                    'bd/rewrite/manager?ids=' +
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
