<template>
    <keep-alive>
        <el-container ref="container" style="flex: 1" class="bg-white cope_text">
            <el-header v-if="!disableAction || !disableFilter" ref="tableHeader" height="auto">
                <div class="border searchBox">
                    <div
                        class="display_flex between section-header searchBox"
                        style="align-items: center; padding: 10px 10px; border-bottom: 1px solid #ddd"
                    >
                        <div class="list-title">筛选查询</div>
                        <div class="display_flex" style="align-items: center">
                            <div v-if="!collapseSearch" class="m-r-10 list-title" style="cursor: pointer" @click="collapseSearch = true">
                                <el-button type="primary" size="small">收起查询</el-button>
                            </div>
                            <div v-else class="m-r-10 list-title" style="cursor: pointer" @click="collapseSearch = false">
                                <el-button type="primary" size="small">展开查询</el-button>
                            </div>
                            <el-button type="primary" size="small" @click="search()">
                                <i class="el-icon-search el-icon--left" /> 查询结果
                            </el-button>
                        </div>
                    </div>
                    <div v-if="!collapseSearch" class="display_flex start between" style="padding: 20px 20px 5px 20px">
                        <div style="width: 100%">
                            <div style="width: 100%">
                                <slot name="filters">
                                    <template v-if="searchFiled && searchFiled.length && !disableFilter">
                                        <el-row style="align-items: center">
                                            <slot name="filter-prefix" />
                                            <el-col
                                                v-for="(item, i) in searchFiled"
                                                :key="i"
                                                :span="8"
                                                class="display_flex"
                                                style="
                                                    align-items: center;
                                                    margin-bottom: 15px;
                                                    white-space: nowrap;
                                                    width: auto;
                                                    margin-right: 15px;
                                                "
                                            >
                                                <div style="margin-right: 10px; min-width: 4.2rem" class="f-s-14">{{ item.name }}:</div>
                                                <div :key="i" class="display_flex" style="align-items: center">
                                                    <el-select
                                                        v-if="Array.isArray(item.options)"
                                                        :key="item.key"
                                                        v-model="filter[item.key]"
                                                        filterable
                                                        clearable
                                                        :placeholder="item.name"
                                                    >
                                                        <!--                            <el-option :label="'全部'+item.name" :value="null">全部{{ item.name }}</el-option>-->
                                                        <el-option
                                                            v-for="option in item.options"
                                                            :key="option.key"
                                                            :value="option.key"
                                                            :label="option.name"
                                                        />
                                                    </el-select>
                                                    <el-date-picker
                                                        v-else-if="item.type === 'TIMESTAMP'"
                                                        :key="item.key"
                                                        v-model="filter[item.key]"
                                                        value-format="timestamp"
                                                        :picker-options="pickerOptions"
                                                        type="daterange"
                                                        unlink-panels
                                                        range-separator="至"
                                                        :start-placeholder="item.name + '开始'"
                                                        :end-placeholder="item.name + '结束'"
                                                    />
                                                    <el-input
                                                        v-else
                                                        :key="item.key"
                                                        :disabled="item.disabled"
                                                        v-model="filter[item.key]"
                                                        :placeholder="item.name"
                                                        clearable
                                                    />
                                                </div>
                                            </el-col>

                                            <slot name="filter" />
                                        </el-row>
                                    </template>
                                </slot>
                            </div>
                            <div>
                                <!--              <el-button type="primary btn_click w-100" @click="search()" :loading="load_mode">查询</el-button>-->
                            </div>
                        </div>
                        <!--          <div class="display_flex end m-b-20" v-if="!disableAction">-->
                        <!--            <slot name="actions">-->
                        <!--              <slot name="addition-actions"></slot>-->
                        <!--              <el-button type="primary" class="m-r-10" v-if="printable" size="123" @click="$emit('print')">打印-->
                        <!--              </el-button>-->
                        <!--              <el-button type="primary" class="m-r-10" v-if="exportable" size="123" @click="exportData"-->
                        <!--                         :loading="load_exp">全部导出-->
                        <!--              </el-button>-->
                        <!--              <el-button type="primary" v-if="insertable" @click="$emit('create')" size="123">-->
                        <!--                {{actionName?actionName:'创建'}}-->
                        <!--              </el-button>-->
                        <!--            </slot>-->
                        <!--          </div>-->
                    </div>
                    <!-- 新增选择框 -->
                    <div v-if="chooseBox" class="w-100">
                        <slot name="chooseBox" />
                    </div>
                </div>
                <div class="display_flex between section-header section-border searchBox">
                    <div class="list-title">数据列表</div>
                    <div v-if="!disableAction">
                        <slot name="actions">
                            <slot name="addition-actions" />
                            <el-button v-if="printable" type="primary" class="m-r-10" size="small" @click="$emit('print')">打印</el-button>
                            <el-button v-if="exportable" type="primary" class="m-r-10" size="small" :loading="load_exp" @click="exportData"
                                >导出</el-button
                            >
                            <el-button v-if="insertable" size="small" type="primary" @click="$emit('create')">{{
                                actionName ? actionName : '新增'
                            }}</el-button>
                        </slot>
                    </div>
                </div>
            </el-header>

            <el-main :style="tableStyle">
                <div class="bg-white" style="height: 100%">
                    <template v-if="tableData">
                        <el-table
                            v-loading="loadingList"
                            :data="tableData.content"
                            label="更新"
                            border
                            height="100%"
                            @cell-click="onCellClick"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column v-if="batchAction" label type="selection" />

                            <template v-for="item in tableHeader">
                                <el-table-column
                                    v-if="item.type === 'IMAGE'"
                                    :key="item.key"
                                    align="center"
                                    :label="item.name"
                                    :prop="item.key"
                                >
                                    <template slot-scope="scope" align="center">
                                        <el-image
                                            fit="cover"
                                            :src="scope.row[item.key]"
                                            :preview-src-list="[scope.row[item.key]]"
                                            style="width: 4rem; height: 4rem"
                                        />
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    v-else-if="item.type === 'TIMESTAMP'"
                                    :key="item.key"
                                    align="center"
                                    :label="item.name"
                                    :prop="item.key"
                                >
                                    <template slot-scope="scope">{{ getTimestamp(scope.row[item.key], item.dateFormat) }}</template>
                                </el-table-column>

                                <el-table-column
                                    v-else-if="Array.isArray(item.searchOption)"
                                    :key="item.key"
                                    align="center"
                                    :label="item.name"
                                    :prop="item.key"
                                    :sortable="item.sortable"
                                >
                                    <template slot-scope="scope">
                                        <slot :name="'table_' + item.key" :item="scope">
                                            <div class="123" :style="'color:' + getOptionsColor(item.searchOption, [scope.row[item.key]])">
                                                {{ getOptionsValue(item.searchOption, [scope.row[item.key]]) }}
                                            </div>
                                        </slot>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    v-else-if="item.type === 'JSON'"
                                    width="290"
                                    :key="item.key"
                                    align="center"
                                    :label="item.name"
                                    :prop="item.key"
                                    ><template slot-scope="scope">
                                        <slot :name="'table_' + item.key" :item="scope">
                                            <div v-for="(i, j) in scope.row.pledgers" :key="j">
                                                <div style="display:flex;justify-content:sapce-around;align-items:center">
                                                    <span style="display: inline-block; min-width: 120px"
                                                        ><span class="json-name">姓名：</span>{{ i.name }}
                                                    </span>
                                                    <span style="min-width: 120px;"><span class="json-name"> 电话：</span> {{ i.phone }}</span>
                                                </div>
                                            </div>
                                        </slot>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    v-else-if="item.type == 'MUSICA'"
                                    width="270"
                                    :key="item.key"
                                    align="center"
                                    :label="item.name"
                                    :prop="item.key"
                                    ><template slot-scope="scope" controls="controls">
                                        <slot :name="'table_' + item.key" :item="scope">
                                           <Audio :src="scope.row.fileUrl"></Audio>
                                        </slot>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    v-else
                                    :key="item.key"
                                    align="center"
                                    :width="item.key == 'fileUrl' ? '240' : ''"
                                    :label="item.name"
                                    :prop="item.key"
                                    :sortable="item.sortable"
                                >
                                    <template slot-scope="scope">
                                        <slot :name="'table_' + item.key">
                                            <div
                                                :style="getStyle(scope.row, item)"
                                                class="less3 m-b-10"
                                                v-html="getValueFromItem(scope.row, item.displayKey || item.key)"
                                            />

                                            <div class="display_flex end">
                                                <el-button
                                                    v-if="
                                                        getValueFromItem(scope.row, item.key) &&
                                                        getValueFromItem(scope.row, item.key).length > 240
                                                    "
                                                    type="text"
                                                    @click="lookMore(getValueFromItem(scope.row, item.key))"
                                                    >查看全部</el-button
                                                >
                                            </div>
                                        </slot>
                                    </template>
                                </el-table-column>
                            </template>
                            <el-table-column
                                v-if="!disableTableAction && tableData && tableData.content"
                                width="240"
                                align="center"
                                label="操作"
                            >
                                <template slot-scope="scope">
                                    <div class="flex-row flex-wrap flex_center">
                                        <slot name="addition-table-actions" :item="scope" />
                                        <el-button
                                            v-if="editable"
                                            size="small"
                                            type="text"
                                            class="m-r-20"
                                            @click="$emit('edit', [scope.row])"
                                            >编辑</el-button
                                        >
                                        <delete-button
                                            v-if="deletetable"
                                            :tip="'是否删除?'"
                                            :type="'text'"
                                            :color="'#F56C6C'"
                                            :loading="scope.row.loading"
                                            @delete="$emit('delete', [scope.row])"
                                        />
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <!--        <div class="pagination" v-if="tableData">-->
                <!--          <el-pagination-->
                <!--            background-->
                <!--            layout="sizes,total, prev, pager, next"-->
                <!--            :current-page="tableData.number+1"-->
                <!--            :page-sizes="[20, 50, 80, 100]"-->
                <!--            :page-size="tableData.size"-->
                <!--            :total="tableData.totalElements"-->
                <!--            @size-change="onPageSizeChange"-->
                <!--            @current-change="onPageChange"-->
                <!--          ></el-pagination>-->
                <!--        </div>-->
            </el-main>
            <el-footer ref="tableFooter" style="align-items: center" class="display_flex flex-row between flex-center border">
                <div style="height: 100%" class="display_flex flex_center">
                    <template v-if="selected && selected.length">
                        <el-button v-if="batchEditable" type="primary" @click="doBatch('edit')">编辑</el-button>
                        <el-button v-if="batchExportable" type="primary" :loading="load_exp" @click="doBatch('export')">部分导出</el-button>
                        <el-button v-if="batchPrintable" type="primary" @click="doBatch('print')">打印</el-button>
                        <el-button v-if="batchDeleteable" type="danger" @click="doBatch('delete')">删除</el-button>
                    </template>
                </div>
                <div v-if="tableData" class="pagination">
                    <el-pagination
                        background
                        layout="sizes,total, prev, pager, next"
                        :current-page="tableData.number + 1"
                        :page-sizes="[20, 50, 80, 100]"
                        :page-size="tableData.size"
                        :total="tableData.totalElements"
                        @size-change="onPageSizeChange"
                        @current-change="onPageChange"
                    />
                </div>
            </el-footer>
        </el-container>
    </keep-alive>
</template>
<script>
import DeleteButton from './DeleteButton';
import moment from 'moment';
import Vue from 'vue';
// import { log } from 'util'
// import bus from '../common/bus';
import FileSaver from 'file-saver';
export default {
    name: 'List',
    components: { 
        DeleteButton ,
        Audio:()=>import('./audio')},
    props: [
        'data',
        'disableFilter',
        'disableAction',
        'disableTableAction',
        'actionName',
        'metaUrl',
        'tableMeta',
        'dataUrl',
        'disableMeta',
        'filters',
        'chooseBox',
        'disableCalculateHeight',
        'load_modes',
        'axiosQuery'
    ],
    data() {
        return {
            requestList: [],
            loadingList: false,
            collapseSearch: false,
            // 导出
            load_exp: false,
            // load_mode
            load_mode: false,

            publishDialog: false,
            pageTotal: 100,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            updateItem: null,
            pageInfo: { page: 0, size: 20 },
            filter: {},
            metaData: null,
            tablePadding: 0,
            tableData: {},
            selected: [],
            red: 'red',
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        };
    },

    computed: {
        tableStyle() {
            // 'height:'+tablePadding+'px;overflow:scroll'
            if (this.disableCalculateHeight) {
                return {
                    overflow: 'scroll',
                    height: '400px'
                };
            }

            return {
                // overflow: 'scroll',
                height: this.tablePadding + 'px'
            };
        },
        searchFiled() {
            let filters = this.filters;
            if (!filters) {
                filters =
                    this.metaData &&
                    this.metaData.subs.filter((it) => {
                        return it.searchable;
                    });
            }
            if (!filters) {
                return [];
            }
            const vm = this;
            return filters.map((it) => {
                Vue.set(vm.filter, it.key, vm.filter[it.key]);
                if (it.optionsUrl && !it.searchOption) {
                    this.getSearchOptions(it.key, it.optionsUrl);
                }
                return {
                    name: it.name,
                    key: it.key,
                    type: it.type,
                    placeholder: it.name,
                    options: it.searchOption,
                    clickable: it.clickable,
                    disabled: it.disabled ? true : false
                };
            });
        },
        tableHeader() {
            if (!this.metaData) {
                return [];
            }
            this.metaData.subs.sort((a, b) => {
                return a.sort - b.sort;
            });
            return this.metaData.subs.filter((it) => {
                return it.displayInList;
            });
        },
        insertable() {
            return this.metaData && this.metaData.insertable;
        },
        deletetable() {
            return this.metaData && (this.metaData.delete === 'DELETE' || this.metaData.delete === 'DELETE_BOTH');
        },
        batchDeleteable() {
            return (
                this.metaData &&
                (this.metaData.delete === 'DELETE_BATCH' ||
                    this.metaData.delete === 'DELETE_BOTH' ||
                    (this.deletetable && this.selected.length == 1))
            );
        },
        editable() {
            return this.metaData && (this.metaData.edit === 'EDIT' || this.metaData.edit === 'EDIT_BOTH');
        },
        batchEditable() {
            return (
                this.metaData &&
                (this.metaData.edit === 'EDIT_BATCH' || this.metaData.edit === 'EDIT_BOTH' || (this.editable && this.selected.length === 1))
            );
        },
        printable() {
            return this.metaData && (this.metaData.print === 'PRINT' || this.metaData.print === 'PRINT_BOTH');
        },
        batchPrintable() {
            return this.metaData && (this.metaData.print === 'PRINT_BATCH' || this.metaData.print === 'PRINT_BOTH');
        },
        exportable() {
            return this.metaData && (this.metaData.export === 'EXPORT' || this.metaData.export === 'EXPORT_BOTH');
        },
        batchExportable() {
            return this.metaData && (this.metaData.export === 'EXPORT_BATCH' || this.metaData.export === 'EXPORT_BOTH');
        },
        batchAction() {
            return this.batchDeleteable || this.batchEditable || this.batchPrintable || this.batchExportable;
        }
    },
    watch: {
        load_modes(val) {
            if (!val) {
                this.load_mode = val;
            }
        },
        data(val) {
            this.tableData = val;
        },
        tableMeta(val) {
            if (val) {
                this.metaData = val;
            }
        },
        tableData(val) {
            if (val && val.content) {
                // this.calcTableHeight();
            }
        },
        filter: {
            deep: true,
            handler: function (cur, pre) {
                this.$emit('filterChange', cur);
            }
        },
        dataUrl: {
            handler(val) {
                if (val) {
                    this.doSearch();
                }
            },
            immediate: true
        }
    },
    created() {
        this.getMetaData();
        // this.doSearch();

        if (this.tableMeta) {
            this.metaData = this.tableMeta;
        }
    },
    mounted() {
        // this.calcTableHeight();
        window.addEventListener('resize', () => {
            // this.calcTableHeight();
        });

        // bus.$on('add_' + this.dataUrl, e => {
        //     this.onAdd(e);
        // });
        // bus.$on('flash_' + this.dataUrl, e => {
        //    this.doSearch();
        // });

        //  bus.$on('flash',res=>{
        //      this.doSearch();
        //  })
    },
    methods: {
        getSearchOptions(key, optionsUrl) {
            //远程搜索
            if (this.requestList.indexOf(optionsUrl) > -1) {
                return;
            }
            this.requestList.push(optionsUrl);
            this.$axios.get(optionsUrl).then((it) => {
                this.metaData.subs = this.metaData.subs.map((item) => {
                    if (key == item.key) {
                        item.searchOption = it.content.map((so) => { //居然没有content
                            return {
                                key: so.id,
                                name: so.name
                            };
                        });
                    }
                    console.log(it);
                    return item;
                });
                return;
            });
        },
        setFilterValue(key, value) {
            Vue.set(this.filter, key, value);
        },
        findFilterChangeKey(cur, previous) {
            const changed = [];
            for (const key in cur) {
                if (cur[key] != previous[key]) {
                    changed.push({ key: key, cur: cur[key], pre: previous[key] });
                }
            }
            return changed;
        },
        getTimestamp(value, format) {
            if (!value) {
                return;
            }
            //手动修改的YYYY-MM-DD HH:mm:ss
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
        getOptionsValue(options, key) {
            const items = options.filter((it) => {
                return it.key == key + '';
            });
            return (items && items.length && items[0].name) || '';
        },
        getOptionsColor(options, key) {
            const items = options.filter((it) => {
                return it.key == key;
            });
            return (items && items.length && items[0].color) || '';
        },
        calcTableHeight() {
            let height = this.$refs.tableFooter.$el.clientHeight;
            height = height + this.getOffsetLeft(this.$refs.container.$el);
            if (this.$refs.tableHeader) {
                height = height + this.$refs.tableHeader.$el.clientHeight + 30;
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
                });
        },
        search() {
            this.pageInfo.page = 0;
            this.load_mode = true;
            setTimeout((res) => {
                this.load_mode = false;
            }, 3000);
            this.doSearch();
        },
        doSearch() {
            const filter = this.parseFilterValues();
            const search = { page: this.pageInfo.page, size: this.pageInfo.size, ...filter ,...this.axiosQuery};
            this.$emit('search', search);
            this.getListData(search);
        },
        parseFilterValues() {
            const filter = Object.assign({}, this.filter);
            const times = [];
            for (const key in filter) {
                const item = filter[key];
                if (Array.isArray(item)) {
                    times.push({ key: key, time: item });
                    delete filter[key];
                }
            }
            const timeFilter = times
                .map((it) => {
                    return it.key + ',' + it.time[0] + ',' + it.time[1];
                })
                .join(';');
            if (timeFilter) {
                filter.times = timeFilter;
            }
            return filter;
        },
        onPageSizeChange(e) {
            this.pageInfo.size = e;
            this.doSearch();
        },
        onPageChange(e) {
            this.pageInfo.page = e - 1;
            this.doSearch();
        },
        getListData(item) {
            if (this.dataUrl || this.$props.dataUrl) {
                this.loadingList = true;
                this.$axios
                    .get(this.dataUrl, { params: item })
                    .then((it) => {
                        this.tableData = it;
                        this.load_mode = false;

                        this.$emit('data', it);
                        this.loadingList = false;
                    })
                    .catch((it) => {
                        this.loadingList = false;
                    });
                return;
            }
            this.$emit('filter', item);
        },
        handleSelectionChange(e) {
            this.selected = e;
            this.$emit('selected', e);
        },
        doBatch(e, confirm) {
            if (!confirm && e === 'delete') {
                this.$confirm('', '确认删除？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.doBatch(e, true);
                });
                return;
            }
            if (e === 'export') {
                this.exportData(
                    this.selected
                        .map((it) => {
                            return it.id;
                        })
                        .join(','),
                    true
                );
                return;
            }
            this.$emit(e, this.selected);
        },
        onDeleted(e) {
            this.tableData.content = this.tableData.content.filter((it) => {
                return (
                    e.filter((item) => {
                        return item.id === it.id;
                    }).length === 0
                );
            });
        },
        onAdd(e) {
            let count = 0;
            this.tableData.content.map((it) => {
                if (it.id != e.id) {
                    count++;
                } else {
                    it = e;
                }
            });
            if (count === this.tableData.content.length) {
                this.tableData.content.unshift(e);
            }
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
        },
        getValueFromItem(item, key) {
            if (!item) {
                return '';
            }
            if (key.indexOf('.') < 0) {
                if (key == 'discount') {
                    return item[key] == 1 ? '不打折' : item[key] ? item[key] * 10 + '折' : '/';
                } else if (key == 'amount') {
                    return item[key] ? item[key] : '/';
                } else {
                    return item[key];
                }
            }

            const keys = key.split('.');
            let value = item;

            keys.forEach((it) => {
                const previous = value;
                value = value[it];

                if (!value) {
                    value = previous;
                }
            });
            return value === item ? '' : value;
        },
        getStyle(valueItem, metaItem) {
            const style = {
                color: metaItem.color
            };
            if (metaItem.clickable) {
                style.color = '#2BA89B';
                style.cursor = 'pointer';
            }
            return style;
        },
        onCellClick(row, column, cell, event) {
            // debugger
            const meta = this.tableHeader[cell.cellIndex - 1];
            if (!meta || !meta.clickable) {
                return;
            }
            this.$emit('cellClick', column.property, row, column.rowSpan, column.colSpan);
        },
        exportData(ids, news) {
            this.$confirm('是否确认导出数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.load_exp = true;
                    this.$emit('exexportDataport');
                    const filter = this.parseFilterValues();
                    if (ids && typeof ids === 'string') {
                        filter.ids = ids;
                    }
                    this.$axios
                        .get(this.dataUrl + '/export', { params: filter })
                        .then((it) => {
                            this.load_exp = false;
                            if (it.msg) {
                                this.$message.success(it.msg);
                                return;
                            } else {
                                FileSaver.saveAs(it.url, it.name);
                            }
                        })
                        .catch((it) => {
                            this.load_exp = false;
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        // 查看
        lookMore(e) {
            this.$alert(e, {
                confirmButtonText: '确定',
                callback: (action) => {}
            });
        }
    }
};
</script>
<style>
.json-name {
    color: #999;
    margin-left: 5px;
    float: left;
}
.list-title {
    font-size: 14px;
    font-weight: bold;
}
.el-header {
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    min-height: 60px;
    padding: 0;
}
.section-header {
    /* background: #e4e7ed; */
    padding: 10px 10px;
    align-items: center;
}

.el-main {
    padding: 0;
}

.el-footer {
    padding: 0 10px;
}

.btn_click {
    width: 64px;
    height: 38px;
    font-size: 14px;
    box-sizing: border-box;
}

.cope_text {
    user-select: text;
}

.el-input {
    /* max-width: 20rem; */
}
.flex-center {
    justify-content: center;
}
.cell img {
    /* max-width: 6rem;
    height: auto; */
    /* display: none; */
}
.display_flex {
    display: flex;
}
.m-r-20 {
    margin-right: 20px;
}
.m-b-10 {
    margin-bottom: 10px;
}
.border {
    border: solid 1px #e0e0e0;
}
.section-border {
    border-left: solid 1px #e0e0e0;
    /* border-top: solid 1px #e0e0e0; */
    border-right: solid 1px #e0e0e0;
}

.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
    width: auto;
}
.searchBox {
    /*background: #fff;*/
    white-space:nowrap;
}
</style>
