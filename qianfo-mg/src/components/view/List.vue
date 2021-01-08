<template>
    <el-container class="bg-white">
        <div ref="headerTop"></div>
        <el-header height="auto" ref="tableHeader">
            <el-row v-if="!hideStatus || (hideStatus && hide)" class="bg-white">
                <el-col :span="20" class="table-action flex-row flex-wrap">
                    <slot name="filters">
                        <div v-if="!searchFiled || !searchFiled.length"></div>
                        <template v-if="searchFiled && searchFiled.length">
                            <template v-for="item in searchFiled">
                                <el-select
                                    v-model="filter[item.key]"
                                    :key="item.key"
                                    clearable
                                    :placeholder="'请选择' + item.name"
                                    v-if="item.options && item.options.length"
                                >
                                    <!-- <el-option :label="'全部'+item.name" :value="null">全部{{item.name}}</el-option> -->
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.key"
                                        :value="option.key"
                                        :label="option.name"
                                    ></el-option>
                                </el-select>
                                <el-date-picker
                                    v-else-if="item.type === 'TIMESTAMP'"
                                    :key="item.key"
                                    v-model="filter[item.key]"
                                    value-format="timestamp"
                                    type="datetimerange"
                                    range-separator="至"
                                    :start-placeholder="item.name + '开始时间'"
                                    :end-placeholder="item.name + '结束日期'"
                                ></el-date-picker>
                                <el-input
                                    :placeholder="item.name"
                                    v-model="filter[item.key]"
                                    clearable
                                    :disabled="item.disabled"
                                    :key="item.key"
                                    v-else
                                ></el-input>
                            </template>
                            <slot name="filter"></slot>
                            <el-button type="primary" @click="search()">筛选</el-button>
                        </template>
                    </slot>
                </el-col>
                <el-col :span="4" class="flex-row end table-action" v-if="!disableAction">
                    <slot name="actions">
                        <slot name="addition-actions"></slot>
                        <el-button type="primary" v-if="printable" @click="$emit('print')">打印</el-button>
                        <el-button type="primary" v-if="exportable" @click="$emit('export')">导出</el-button>
                        <el-button type="primary" v-if="insertable" @click="$emit('create')">
                            {{
                            actionName ? actionName : '创建'
                            }}
                        </el-button>
                    </slot>
                </el-col>
            </el-row>
            <el-row v-if="hideStatus">
                <el-button
                    style="margin-bottom:1rem"
                    type="primary"
                    @click="hide = !hide"
                >{{ hide ? '隐藏' : '打开' }}搜索</el-button>
            </el-row>
        </el-header>

        <el-main :style="'height:' + tablePadding + 'px;'">
            <div class="bg-white" style="height:100%">
                <template v-if="tableData">
                    <el-table
                        :data="tableData.content"
                        label="更新"
                        border
                        v-loading="tableLoading"
                        height="100%"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="50" v-if="batchAction"></el-table-column>
                        <el-table-column label="序号" width="50" key="sortNumber" v-if="hideStatus">
                            <template
                                slot-scope="scope"
                            >{{ scope.$index + 1 + tableData.number * tableData.size }}</template>
                        </el-table-column>
                        <template v-for="item in tableHeader">
                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-if="item.type === 'IMAGE'"
                            >
                                <template slot-scope="scope">
                                    <el-image
                                        :src="scope.row[item.key]"
                                        fit="cover"
                                        :preview-src-list="[scope.row[item.key]]"
                                        style="width:4rem;height:4rem;"
                                    ></el-image>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else-if="item.type === 'TIMESTAMP'"
                            >
                                <template slot-scope="scope">{{ getTimestamp(scope.row[item.key]) }}</template>
                            </el-table-column>
                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else-if="item.key === 'certification'"
                            >
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row[item.key] == '待审核'">待审核</el-tag>
                                    <el-tag type="danger" v-if="scope.row[item.key] == '未通过'">未通过</el-tag>
                                    <el-tag type="success" v-if="scope.row[item.key] == '通过'">通过</el-tag>
                                    <el-tag type="info" v-if="scope.row[item.key] == '取消'">取消</el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else-if="item.key === 'accessStatus'"
                            >
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row[item.key] == '未到访'">未到访</el-tag>
                                    <el-tag type="success" v-if="scope.row[item.key] == '已到访'">已到访</el-tag>
                                    <el-tag type="info" v-if="scope.row[item.key] == '会面结束'">会面结束</el-tag>
                                    <el-tag type="danger" v-if="scope.row[item.key] == '违约'">违约</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else-if="item.key === 'isFirst'"
                            >
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row[item.key] == '是'">是</el-tag>
                                    <el-tag type="info" v-if="scope.row[item.key] == '否'">否</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="item.name"
                                :prop="item.key"
                                :key="item.key"
                                v-else
                            >
                                <template slot-scope="scope">
                                    <div
                                        :style="'color:' + scope.row.color"
                                    >{{ scope.row[item.key] }}</div>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column
                            label="操作"
                            v-if="!disableTableAction && tableData && tableData.content"
                        >
                            <template slot-scope="scope">
                                <div class="table-action flex-row flex-wrap">
                                    <slot name="addition-table-actions" :item="scope"></slot>
                                    <el-button
                                        type="primary"
                                        v-if="editable"
                                        @click="$emit('edit', [scope.row])"
                                    >编辑</el-button>
                                    <delete-button
                                        size="small"
                                        :tip="'是否删除?'"
                                        v-if="deletetable"
                                        :loading="scope.row.loading"
                                        @delete="$emit('delete', [scope.row])"
                                    ></delete-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </el-main>
        <el-footer ref="tableFooter" class="flex-row between flex-center">
            <div style="height:100%;" class="flex-row flex-center">
                <template v-if="selected && selected.length">
                    <slot name="addbatch-btn-actions"></slot>
                    <el-button type="primary" @click="doBatch('edit')" v-if="batchEditable">编辑</el-button>
                    <el-button type="primary" @click="doBatch('export')" v-if="batchExportable">导出</el-button>
                    <el-button type="primary" @click="doBatch('print')" v-if="batchPrintable">打印</el-button>
                    <el-button type="danger" @click="doBatch('delete')" v-if="batchDeleteable">删除</el-button>
                </template>
            </div>
            <div class="pagination" v-if="tableData">
                <el-pagination
                    background
                    layout="sizes,total, prev, pager, next"
                    :current-page="tableData.number + 1"
                    :page-sizes="[20, 50, 80, 100]"
                    :page-size="tableData.size"
                    :total="tableData.totalElements"
                    @size-change="onPageSizeChange"
                    @current-change="onPageChange"
                ></el-pagination>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
import DeleteButton from './DeleteButton';
import moment from 'moment';
import Vue from 'vue';
import { log } from 'util';
export default {
    props: [
        'data',
        'disableFilter',
        'disableAction',
        'disableTableAction',
        'disableTableAction',
        'actionName',
        'metaUrl',
        'tableMeta',
        'dataUrl',
        'metaStatus',
        'hideStatus'
    ],
    components: { DeleteButton },
    data() {
        return {
            publishDialog: false,
            pageTotal: 100,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            updateItem: null,
            pageInfo: { page: 0, size: 20, pageSize: 20, pageNum: 1 },
            filter: {},
            metaData: null,
            tablePadding: 0,
            tableData: {},
            selected: [],
            tableLoading: false, //表格加载态
            fisrtLoading: false, //第一次加载
            hide: true
        };
    },
    watch: {
        filter: {
            handler(val) {
                if (this.fisrtLoading) {
                    setTimeout(() => {
                        this.doSearch();
                    }, 300);
                    this.fisrtLoading = false;
                }
            },
            deep: true,
            immediate: true
        },
        tableMeta: {
            handler(val) {
                if (val) {
                    this.metaData = val;
                }
            },
            immediate: true
        },
        data: {
            handler(val) {
                if (val) {
                    this.tableData = Object.assign({}, val);
                }
            },
            deep: true,
            immediate: true
        },
        tableData: {
            handler(val) {
                if (val && val.content) {
                    this.calcTableHeight();
                }
            },
            immediate: true
        }
    },
    created() {
        this.getMetaData();
        this.doSearch();
    },
    mounted() {
        this.calcTableHeight();
        window.addEventListener('resize', () => {
            this.calcTableHeight();
        });
    },
    computed: {
        searchFiled() {
            if (!this.metaData || !this.metaData.subs) {
                return [];
            }
            let vm = this;
            return this.metaData.subs
                .filter((it) => {
                    return it.searchable;
                })
                .map((it) => {
                    if (it.value) {
                        this.fisrtLoading = true;
                    }
                    Vue.set(vm.filter, it.key, it.value ? it.value : null);
                    return {
                        name: it.name,
                        key: it.key,
                        type: it.type,
                        placeholder: it.name,
                        options: it.searchOption,
                        disabled: it.disabled ? true : false
                    };
                });
        },
        tableHeader() {
            if (!this.metaData || !this.metaData.subs) {
                return [];
            }
            return this.metaData.subs.filter((it) => {
                return it.displayInList;
            });
        },
        insertable() {
            return this.metaData && this.metaData.insertable;
        },
        deletetable() {
            return this.metaData && (this.metaData.delete == 'DELETE' || this.metaData.delete == 'DELETE_BOTH');
        },
        batchDeleteable() {
            return (
                this.metaData &&
                (this.metaData.delete == 'DELETE_BATCH' ||
                    this.metaData.delete == 'DELETE_BOTH' ||
                    (this.deletetable && this.selected.length == 1))
            );
        },
        editable() {
            return this.metaData && (this.metaData.edit == 'EDIT' || this.metaData.edit == 'EDIT_BOTH');
        },
        batchEditable() {
            return (
                this.metaData &&
                (this.metaData.edit == 'EDIT_BATCH' || this.metaData.edit == 'EDIT_BOTH' || (this.editable && this.selected.length == 1))
            );
        },
        printable() {
            return this.metaData && (this.metaData.print == 'PRINT' || this.metaData.print == 'PRINT_BOTH');
        },
        batchPrintable() {
            return this.metaData && (this.metaData.print == 'PRINT_BATCH' || this.metaData.print == 'PRINT_BOTH');
        },
        exportable() {
            return this.metaData && (this.metaData.export == 'EXPORT' || this.metaData.export == 'EXPORT_BOTH');
        },
        batchExportable() {
            return this.metaData && (this.metaData.export == 'EXPORT_BATCH' || this.metaData.export == 'EXPORT_BOTH');
        },
        batchAction() {
            return this.batchDeleteable || this.batchEditable || this.batchPrintable || this.batchExportable;
        }
    },
    methods: {
        getTimestamp(value) {
            return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
        },
        calcTableHeight() {
            let height = this.$refs.tableFooter ? this.$refs.tableFooter.$el.clientHeight : 0;
            if (this.$refs.tableHeader) {
                height = height + this.getOffsetLeft(this.$refs.tableHeader.$el) + this.$refs.tableHeader.$el.clientHeight + 30;
            }
            this.tablePadding = document.body.clientHeight - height;
        },
        getOffsetLeft(elem) {
            var offsetLeft = 0;
            do {
                if (!isNaN(elem.offsetTop)) {
                    offsetLeft += elem.offsetTop;
                }
            } while ((elem = elem.offsetParent));
            return offsetLeft;
        },
        getMetaData() {
            const vm = this;
            const metaUrl = this.metaUrl;
            if (this.disableMeta) {
                return;
            }
            if (!metaUrl) {
                return;
            }
            this.$axios
                .get('meta?path=' + metaUrl)
                .then((it) => {
                    vm.metaData = it;
                    vm.$emit('meta', it);
                })
                .catch((it) => {
                    // console.log(it)
                });
        },
        search() {
            if (this.$props.metaStatus) {
                this.pageInfo.pageNum = 1;
            } else {
                this.pageInfo.page = 0;
            }
            this.doSearch();
        },
        doSearch() {
            if (!this.dataUrl) {
                return;
            }
            let filter = Object.assign({}, this.filter);
            let filed = Object.assign({}, this.searchFiled);

            let times = [];
            for (let k in filter) {
                for (let f in filed) {
                    if (filed[f].key == k) {
                        if (filed[f].type == 'TIMESTAMP' && filter[k] && filter[k].length) {
                            let item = k + ',' + filter[k][0] + ',' + filter[k][1];
                            times.push(item);
                            delete filter[k];
                        }
                    }
                }
            }
            if (times && times.length) {
                filter.times = times.join(';');
            }
            // if (filter.createTime && filter.createTime.length) {
            //     filter.startTime = filter.createTime[0];
            //     filter.endTime = filter.createTime[1];
            //     delete filter.createTime;
            // }
            let query = {
                ...filter
            };
            if (this.$props.metaStatus) {
                query.pageNum = this.pageInfo.pageNum;
                query.pageSize = this.pageInfo.pageSize;
            } else {
                query.page = this.pageInfo.page;
                query.size = this.pageInfo.size;
            }
            this.getListData(query);
        },
        onPageSizeChange(e) {
            this.pageInfo.pageSize = e;
            this.pageInfo.size = e;
            this.doSearch();
        },
        onPageChange(e) {
            this.pageInfo.pageSize = e - 1;
            this.pageInfo.page = e - 1;
            this.doSearch();
        },
        getListData(item) {
            this.$emit('getSelect', item);
            this.tableLoading = true;
            this.$axios
                .get(this.dataUrl, { params: item })
                .then((it) => {
                    this.tableLoading = false;
                    this.tableData = Object.assign({}, it);
                    // this.tableData.content = [];

                    // console.log(it, this.tableData);
                    this.$emit('data', it);
                })
                .catch((err) => {
                    this.tableLoading = false;
                });
        },
        handleSelectionChange(e) {
            this.selected = e;
            this.$emit('selected', e);
        },
        doBatch(e, confirm) {
            if (!confirm && 'delete' === e) {
                this.$confirm('', '确认删除？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.doBatch(e, true);
                });
                return;
            }
            this.$emit(e, this.selected);
        },
        onDeleted(e) {
            this.tableData.content = this.tableData.content.filter((it) => {
                return (
                    e.filter((item) => {
                        return item.id == it.id;
                    }).length == 0
                );
            });
        },
        onAdd(e) {
            this.tableData.content.unshift(e);
        },
        onUpdate(e) {
            this.tableData.content = this.tableData.content.map((it) => {
                e.forEach((item) => {
                    if (item.id === it.id) {
                        it = item;
                    }
                });
                return it;
            });
        }
    }
};
</script>
<style scoped>
.el-header {
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    padding: 10px 10px 0px 10px;
    min-height: 60px;
}
.el-main {
    padding: 0;
}
.el-footer {
    padding: 0 10px;
}
</style>
