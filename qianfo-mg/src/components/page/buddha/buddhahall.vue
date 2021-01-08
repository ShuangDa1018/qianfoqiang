<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.BuddhaHall'"
            @create="edit"
            @edit="edit"
            @delete="doDelete"
            @meta="meta"
            ref="list"
        >
            <template slot="addition-table-actions" slot-scope="scope">
                <el-button class="m-r-10" type="text" @click="goWall(scope.item.row)">千佛墙</el-button>
            </template>
        </List>
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
            dataUrl: '/buddhahall',
            showStatus: false,
            loading: false,
            addInfo: {}
        };
    },
    watch: {
        showStatus(val) {
            if (!val) {
                this.addInfo = {};
            }
        }
    },
    methods: {
        meta(meta){
            meta.subs.forEach(it=>{
                    if(it.key=='appQrCode'||it.key=='buddhaHallQrCode'){
                        it.displayInList=true
                        it.type='IMAGE'
                        it.sort = 10
                    }
            })
        },
        goWall(scope) {
            this.$router.push({
                path: '/buddha/wallDetail',
                query: {
                    id: scope.id,
                    x:scope.x,
                    y:scope.y,
                }
            });
        },
        //编辑新增
        edit(e) {
            if (e && e.length) {
                sessionStorage.setItem('form', JSON.stringify(e[0]));
            }
            console.log(e)
            this.$router.push('/buddha/' + (e ? 'buddhahallEdit' : 'buddhahallAdd'));
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
                            this.$message.success(query.id ? '编辑成功' : '新增成功');
                            this.loading = false;
                            this.showStatus = false;
                            this.$refs.list.doSearch();
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
        },
        //删除
        doDelete(e) {
            this.$axios
                .delete(this.dataUrl, {
                    params: {
                        ids: e
                            .map((it) => {
                                return it.id;
                            })
                            .join(',')
                    }
                })
                .then(() => {
                    this.$message.success('删除成功');
                    this.$refs.list.doSearch();
                });
        }
    }
};
</script>

<style>
</style>