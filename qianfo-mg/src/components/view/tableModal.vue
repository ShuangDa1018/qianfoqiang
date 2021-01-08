<template>
    <div>
        <Dialog
            :title="title"
            :hiddenBody="true"
            :minWidth="800"
            :showStatus="showStatus"
            :width="width"
            @close="close"
        >
            <template slot="table">
                <div class="top-header">
                    <slot name="topHeader"></slot>
                </div>
                <div>
                    <el-table
                        @selection-change="handleSelectionChange"
                        max-height="450"
                        :data="infoData"
                        v-loading="tableLoading"
                    >
                        <el-table-column type="selection" width="55" v-if="selectMore"></el-table-column>
                        <template
                            v-for="(item, index) in meta.filter(it => {
                                return it.type == 'default' || !it.type;
                            })"
                        >
                            <el-table-column
                                :fixed="item.fixed"
                                :key="'d' + index"
                                :label="item.name"
                                :prop="item.key"
                            ></el-table-column>
                        </template>
                        <template
                            v-for="(item, index) in meta.filter(it => {
                                return it.type == 'image';
                            })"
                        >
                            <el-table-column
                                :fixed="item.fixed"
                                :key="'i' + index"
                                :label="item.name"
                            >
                                <template slot-scope="scope">
                                    <el-image
                                        style="width:4rem;height:4rem;"
                                        :src="scope.row[item.key]"
                                        fit="cover"
                                        :preview-src-list="[scope.row[item.key]]"
                                    ></el-image>
                                </template>
                            </el-table-column>
                        </template>
                        <template
                            v-for="(item, index) in meta.filter(it => {
                                return it.type == 'setting';
                            })"
                        >
                            <el-table-column
                                :fixed="item.fixed"
                                :key="'s' + index"
                                :label="item.name"
                            >
                                <template slot-scope="scope">
                                    <span
                                        :style="{
                                            color:
                                                item.options[scope.row[item.key]] && item.options[scope.row[item.key]].color
                                                    ? item.options[scope.row[item.key]].color
                                                    : ''
                                        }"
                                    >
                                        {{
                                        item.options[scope.row[item.key]] && item.options[scope.row[item.key]].name
                                        ? item.options[scope.row[item.key]].name
                                        : ''
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column label="操作">
                            <template slot-scope="item">
                                <slot name="addition-table-actions" :item="item"></slot>
                                <el-button
                                    size="small"
                                    type="text"
                                    class="m-r-20"
                                    v-if="selected"
                                    @click="select(item.row)"
                                >选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
            <template slot="footer">
                <div class="flex-row flex-between">
                    <div>
                        <el-button v-if="selectMore" type="primary" @click="selectedMore">选择选中</el-button>
                    </div>
                    <pageNation
                        :total="total"
                        :currentPage="currentPage"
                        :pageSize="pageSize"
                        @sizeChange="sizeChange"
                        @pageChange="pageChange"
                    ></pageNation>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script>
/**
 * selectMore 多选
 * max 多选时有效
 * metaKey : [{
 *  name,
 * key
 * type //default,image,setting,
 * fixed
 * }]
 *
 */
import Dialog from './dialog';
import pageNation from './pageNation';
export default {
    components: {
        Dialog,
        pageNation
    },
    props: ['max', 'selectMore', 'selected', 'title', 'loading', 'showStatus', 'width', 'minWidth', 'searchFiled', 'dataUrl', 'metaKey'],
    data() {
        return {
            hiddenFooter: true, //隐藏dialog的footer
            total: 0,
            pageSize: 10,
            currentPage: 0,
            meta: [],
            infoData: [],
            tableLoading: false,
            selectMoreList: []
        };
    },
    watch: {
        metaKey: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.meta = val;
                }
            },
            deep: true
        },
        showStatus: {
            handler(val) {
                if (val) {
                    this.getTableInfo();
                }
            }
        },
        loading(val) {
            this.tableLoading = val;
        },
        searchFiled: {
            handler(val) {
                if (!val) {
                    return;
                }
                if (val.currentPage || val.currentPage === 0) {
                    this.currentPage = val.currentPage;
                } else {
                    this.currentPage = 0;
                }
                delete val.currentPage;
                this.getTableInfo(val);
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        /**
         * 多选选中列表
         */
        handleSelectionChange(val) {
            this.selectMoreList = val;
        },
        /**
         * 选择更多
         */
        selectedMore() {
            if (this.selectMoreList.length > this.$props.max) {
                this.$message.warning('最多选择' + this.$props.max + '个！');
                return;
            }
            this.$emit('selectMore', this.selectMoreList);
        },
        select(e) {
            this.$emit('select', e);
        },
        /**关闭 */
        close() {
            this.$emit('close');
        },
        sizeChange(e) {
            this.pageSize = e;
            this.getTableInfo();
        },
        pageChange(e) {
            this.currentPage = e;
            this.getTableInfo();
        },
        /**
         * 获取列表
         */
        getTableInfo() {
            let query = {
                page: this.currentPage ? this.currentPage - 1 : this.currentPage,
                size: this.pageSize,
                ...this.$props.searchFiled
            };
            this.tableLoading = true;
            this.$axios
                .get(this.$props.dataUrl, {
                    params: query
                })
                .then((res) => {
                    this.tableLoading = false;
                    res.content.forEach((it) => {
                        it.userCarStatus = 'ENABLE';
                    });
                    this.infoData = res.content;
                    this.total = res.totalElements;
                })
                .catch((err) => {
                    this.tableLoading = false;
                });
        }
    }
};
</script>
<style lang="less" scoped>
.top-header {
    margin-bottom: 15px;
}
</style>
