<template>
    <div id="addForm" class="add-container" :style="{ height: pageHeight }">
        <div class="form" :style="{ width: maxWidth + '%' }">
            <div>
                <el-form ref="form" :model="addInfo" :rules="rules" label-width="100px">
                    <div v-for="(item, index) in metaForm" :key="index">
                        <div class="form-box-title" v-if="item.title">{{ item.name }}</div>
                        <el-form-item
                            :label="item.name"
                            v-if="!item.hide && !item.title"
                            :prop="item.key"
                            :label-width="labelWidth"
                        >
                            <div v-if="item.type == 'INPUT'||!item.type">
                                <el-input
                                    :placeholder="'请输入' + item.name"
                                    v-model="addInfo[item.key]"
                                ></el-input>
                            </div>
                            <!-- <div v-if="item.type == 'OBJECT'">
                                <el-input
                                    :placeholder="'请输入' + item.name"
                                    v-model="addInfo[item.object][item.key]"
                                ></el-input>
                            </div> -->
                            <div v-if="item.type == 'SELECT'">
                                <el-select
                                    :disabled="item.disabled"
                                    :filterable="item.searchStatus ? true : false"
                                    :remote="item.searchStatus ? true : false"
                                    :remote-method="
                                        query => {
                                            getSelectSearchList(query, item, index);
                                        }
                                    "
                                    :placeholder="'请选择' + item.name"
                                    :loading="item.loading"
                                    v-model="addInfo[item.key]"
                                >
                                    <el-option
                                        v-for="(it, ix) in item.selectList"
                                        :key="item.key + ix"
                                        :label="it[item.label ? item.label : 'name']"
                                        :value="it[item.value ? item.value : 'key']"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div v-if="item.type == 'IMAGE'">
                                <uploadImg
                                    :list="addInfo[item.key]"
                                    :maxLength="item.max ? item.max : 1"
                                    @change="getValue($event, item.key)"
                                ></uploadImg>
                            </div>
                            <div v-if="item.type == 'SWITCH'">
                                <el-switch v-model="addInfo[item.key]"></el-switch>
                            </div>
                            <div v-if="item.type == 'EDITOR'">
                                <editor
                                    :content="addInfo[item.key]"
                                    :ref="'editor'+item.key"
                                    @change="getValue($event, item.key)"
                                ></editor>
                            </div>
                            <div v-if="item.type == 'DATE'">
                                <el-date-picker
                                    :valueFormat="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
                                    v-model="addInfo[item.key]"
                                    type="datetime"
                                    :placeholder="'请选择' + item.name"
                                ></el-date-picker>
                            </div>
                            <div v-if="item.type == 'TIME'">
                                <el-time-picker
                                    :valueFormat="item.valueFormat ? item.valueFormat : 'HH:mm:ss'"
                                    v-model="addInfo[item.key]"
                                    type="time"
                                    :picker-options="item.options"
                                    :placeholder="'请选择' + item.name"
                                ></el-time-picker>
                            </div>

                            <div v-if="item.type == 'TABLE'">
                                <div>
                                    <div
                                        v-if="!addInfo[item.key]||addInfo[item.key].length<item.max"
                                    >
                                        <el-button
                                            @click="openTableModal(item)"
                                            type="primary"
                                            size="mini"
                                        >添加</el-button>
                                    </div>
                                    <tableBind :content="addInfo[item.key]"></tableBind>
                                    <div class="table-list">
                                        <div
                                            class="table-item"
                                            v-for="(tab, tax) in addInfo[item.key]"
                                            :key="tax"
                                        >
                                            <span>{{ tab.name }}</span>
                                            <i
                                                @click="deleteTable(tax,item.key)"
                                                class="el-icon-error table-item-close"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="caption" v-if="item.caption">{{ item.caption }}</div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="opeart-btn">
                <el-button @click="goBack" v-if="!disabled">返回</el-button>
                <el-button type="primary" @click="save" :loading="loading">保存</el-button>
            </div>
        </div>
        <!-- <div class="demo" v-if="maxWidth" :style="{ width: 100 - maxWidth + '%' }"></div> -->

        <tableModal
            :showStatus="tableSetting.showStatus"
            :title="tableSetting.title"
            :width="tableSetting.width"
            :metaKey="tableSetting.metaKey"
            :dataUrl="tableSetting.dataUrl"
            :selected="tableSetting.selected"
            :selectMore="tableSetting.selectMore"
            :max="tableItem.max?tableItem.max-(addInfo[tableItem.key]?addInfo[tableItem.key].length:0):0"
            :searchFiled="tableSetting.searchFiled"
            @close="tableSetting.showStatus = false"
            @select="getSelect"
            @selectMore="getSelectMore"
        >
            <template slot="topHeader">
                <div class="flex-row">
                    <template v-for="(item, index) in searchFiled">
                        <div class="m-r-10" :key="index" v-if="(item.type = 'INPUT')">
                            <el-input
                                clearable
                                v-model="tableSearch[item.key]"
                                :placeholder="item.name"
                            ></el-input>
                        </div>
                    </template>
                    <el-button type="primary" class="m-r-10" @click="searchTable">搜索</el-button>
                </div>
            </template>
        </tableModal>
    </div>
</template>

<script>
/**
 * list 中每个item的配置
 * name 输入时的名称
 * key  填值的key
 * type 类型 【INPUT】输入框  【SELECT】选择框 【SWITCH】开关 【IMAGE】上传图片 【EDITOR】富文本框
 * 【DATE】时间选择 【DATERANGE】时间段选择 【TIME】选择时间-时分秒 【TABLE】选择表格中的内容
 * label 如果type为select，option的label的值的字段 默认为name
 * value 如果type为select，option的value的值的字段 默认为key
 * searchStatus 如果type为select时，是否可以远程搜索
 * selectUrl 如果type为select时，远程搜索的请求地址和获取选择内容的地址
 * selectSearchKey 如果type为select时，远程搜索的关键字
 * selectList 如果type为select 选择的列表
 * disabled 如果type为select 禁用选择
 * options 如果type为time，设置时间选择
 * max  如果type为image，图片的上传最大数量。默认为1
 * caption  提示
 * required 是否必填 默认为false，不必填
 * validator 自定义验证方式
 * validatorMessae 自定义验证方式的错误提示
 * trigger 验证的方式 默认change
 * hide  是否隐藏
 * otherKey 用于确定唯一item
 * default  默认值
 * valueFormat 如果type为DATE或者DATERANGE时，设置获取时间的类型 默认'yyyy-MM-dd HH:mm:ss'
 * tableSetting: tableModal的设置
 *
 * searchFiled: tableModal 的搜索设置
 * disabled 是否返回，且删除内存中的本页面 true不，false要，默认false
 *
 *
 */
import bus from '../common/bus';
export default {
    props: ['formSetting', 'defaultInfo'],
    components: {
        uploadImg: () => import('@/components/common/uploadImg'),
        editor: () => import('@/components/common/tinyEditor'),
        tableModal: () => import('../view/tableModal'),
        tableBind: () => import('../view/tableBind')
    },

    computed: {
        /**
         * 表单的label的宽度的
         */
        labelWidth() {
            return (this.$props.formSetting.labelWidth || 300) + 'px';
        },
        /**
         * 表单的最大宽度
         */
        maxWidth() {
            return this.$props.formSetting.width || 100;
        },
        /**
         * 页面的高度
         */
        pageHeight() {
            return (
                'calc(100vh - ' + ((this.$props.formSetting.lessHeight ? this.$props.formSetting.lessHeight : 0) + 120) + 'px) !important'
            );
        },
        /**
         * 表单的高度
         */
        formHeight() {
            return (
                'calc(100vh - ' + ((this.$props.formSetting.lessHeight ? this.$props.formSetting.lessHeight : 0) + 175) + 'px) !important'
            );
        }
    },
    watch: {
        defaultInfo: {
            handler(val) {
                if (val) {
                    this.addInfo = Object.assign({}, val);
                } else {
                    this.addInfo = {};
                }
            },
            // deep: true,
            immediate: true
        },
        //监听form的item的list
        'formSetting.list': {
            handler(val) {
                val.forEach((it, ix) => {
                    if (it.type == 'SELECT') {
                        if (it.selectUrl && (!it.selectList || !it.selectList.length)) {
                            this.getSelectList(ix, it.selectUrl, it.selectSearch);
                        }
                    }
                    if (it.default) {
                        //设置默认值
                        this.addInfo[it.key] = it.default;
                    }
                });

                this.metaForm = val;
                this.initRules();
            },
            deep: true,
            immediate: true
        },
        formSetting: {
            handler(val) {
                this.url = val.url;
                this.backUrl = val.backUrl;
                this.request = val.request ? true : false;
                this.disabled = val.disabled ? true : false;
            },
            deep: true,
            immediate: true
        },
        addInfo: {
            handler(val) {
                this.$emit('change', val);
            },
            deep: true
        },
        $route(to, form) {
            this.$nextTick(() => {
                if (this.$refs.form) {
                    this.$refs.form.clearValidate();
                }
            });
        }
    },

    data() {
        return {
            loading:false,
            disabled: false,
            url: '',
            backUrl: '', //跳转回去的路径
            request: false, //是否区分put和post
            addInfo: {},
            metaForm: [],
            rules: {},
            placeMessage: {
                IMAGE: '上传',
                SELECT: '选择',
                SWITCH: '选择',
                DATERANGE: '选择',
                TIME: '选择',
                TABLE: '选择',
                DATE: '选择',
                INPUT: '输入',
                OBJECT:'输入',
                EDITOR: '输入'
            },
            tableItem: '', //tableModal需要
            tableSearch: {},
            searchFiled: [],
            tableSetting: {
                title: '',
                showStatus: false
            }
        };
    },
    methods: {
        /**
         * 生成rules
         */
        initRules() {
            let list = this.metaForm.filter((it) => {
                return it.required;
            });
            list.forEach((it) => {
                let arr = [];
                arr.push({
                    required: it.required ? true : false,
                    message: '请' + this.placeMessage[it.type||"INPUT"] + it.name,
                    trigger: it.trigger ? it.trigger : 'change'
                });
                if (it.validator) {
                    arr.push({
                        validator: it.validator,
                        message: it.validatorMessage ? it.validatorMessage : '请' + this.placeMessage[it.type||"INPUT"] + '正确的' + it.name,
                        trigger: it.trigger ? it.trigger : 'change'
                    });
                }
                this.rules[it.key] = arr;
            });
        },
        /**
         * 获取选择框生成的数组
         * ix 数组中的索引
         * url 请求地址
         * query 默认的搜索条件
         */
        getSelectList(ix, url, query) {
            this.$axios.get(url, { params: query }).then((res) => {
                this.metaForm[ix].loading = false;

                let info = Object.assign({}, this.metaForm[ix]);
                info.selectList = res.content;

                this.metaForm.splice(ix, 1, info);
            });
        },
        getSelectSearchList(value, data, index) {
            if (!data.selectSearch) {
                data.selectSearch = {};
            }
            this.metaForm[index].loading = true;
            data.selectSearch[data.selectSearchKey] = value;
            this.getSelectList(index, data.selectUrl, data.selectSearch);
        },
        /**
         * 获取可搜索的选择框的数组
         */
        getSearchSelectList(value, item) {
        },
        goBack() {
            // this.$router.go(-1);
            bus.$emit('close_specify_tags', {
                path: this.$route.path,
                jumpPath: this.backUrl
            });
        },
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // console.log(this.$refs['editorcontent']);
                    let filter = this.metaForm.filter((it) => {
                        return it.type == 'EDITOR';
                    });
                    filter.forEach((it) => {
                        if (!it.hide) {
                            this.addInfo[it.key] = this.$refs['editor' + it.key][0].getContent();
                        }
                    });
                    let info = Object.assign({}, this.addInfo);
                    for (let k in info) {
                        if (this.$func.isArray(info[k])) {
                            info[k] = info[k]
                                .map((it) => {
                                    if (it.id) {
                                        return it.id;
                                    } else {
                                        return it;
                                    }
                                })
                                .join(',');
                        }
                    }
                    if(info.mchId) { //编辑佛殿 对象
                        info.weChatConfig={
                            mchId:info.mchId,
                            mchKey:info.mchKey
                        }
                    }
                    this.loading=true
                    this.$axios[this.request ? (info.id ? 'put' : 'post') : 'post'](this.url, {
                        ...info
                    }).then((res) => {
                        this.loading=false
                        this.$message.success(info.id ? '编辑成功' : '添加成功');
                        if (!this.disabled) {
                            this.goBack();
                        }
                    }).cathc(()=>{
                        this.loading=false
                    })
                }
            });
        },
        /**
         * 获取表单的值
         */
        getValue(file, key) {
            this.addInfo[key] = file;
            this.addInfo = Object.assign({}, this.addInfo);
        },
        /**
         * 设置数组值
         */
        pushValue(key, value) {
            if (!this.addInfo[key]) {
                this.addInfo[key] = [];
            }
            this.addInfo[key].push(value);
            this.addInfo = Object.assign({}, this.addInfo);
        },
        /**
         * 设置表单的值
         */
        setValue(key, value) {
            this.addInfo[key] = value;
            this.addInfo = Object.assign({}, this.addInfo);
        },
        /**
         * 打开tableModal
         */
        openTableModal(data) {
            this.tableItem = data;
            this.searchFiled = data.searchFiled;
            this.tableSetting.showStatus = true;
            this.tableSetting = Object.assign(this.tableSetting, data.tableSetting);
        },
        /**
         * 搜索table
         */
        searchTable() {
            this.tableSetting.searchFiled = Object.assign({}, this.tableSearch);
            this.tableSetting = Object.assign({}, this.tableSetting);
        },
        /**
         * 获取选择
         */
        getSelect(e) {
            let arr = this.addInfo[this.tableItem.key];
            if (arr && arr.length) {
                let filter = arr.filter((it) => {
                    return it.id == e.id;
                });
                if (filter && filter.length) {
                    this.$message.error('已有相同内容');
                    return;
                }
                if (arr.length >= this.tableItem.max) {
                    this.$message.error(this.tableItem.name + '最多选择' + this.tableItem.max + '个');
                    return;
                }
            }
            this.pushValue(this.tableItem.key, e);
            this.tableSetting.showStatus = false;
            this.tableSetting = Object.assign({}, this.tableSetting);
        },
        /**
         * 获取多选
         */
        getSelectMore(data) {
            let arr = this.addInfo[this.tableItem.key];
            if (!arr || !arr.length) {
                arr = [];
            }
            let other = 0;
            data.forEach((it) => {
                let filter = arr.filter((ar) => {
                    return it.id == ar.id;
                });
                if (!filter || !filter.length) {
                    this.pushValue(this.tableItem.key, it);
                } else {
                    other = other + 1;
                }
            });
            if (other) {
                this.$message.success('相同数据已被筛掉');
            }
            this.tableSetting.showStatus = false;
            this.tableSetting = Object.assign({}, this.tableSetting);
        },
        /**
         * 删除选择
         */
        deleteTable(index, key) {
            this.addInfo[key].splice(index, 1);
            this.addInfo = Object.assign({}, this.addInfo);
        }
    }
};
</script>

<style lang="less" scoped>
.img-list {
    display: flex;
}
.coverPicture {
    width: 150px;
    height: 150px;
    cursor: pointer;
}
.coverPicture.center {
    text-align: center;
    line-height: 150px;
    border: 1px solid #f8f8f8;
}
.detailPicture {
    cursor: pointer;
    width: 100px;
    height: 100px;
    margin-right: 15px;
    margin-bottom: 15px;
}
.detailPicture.center {
    text-align: center;
    line-height: 100px;
    border: 1px solid #f8f8f8;
}
/deep/.el-form-item--small.el-form-item {
    display: flex;
    margin-bottom: 25px;
    .el-form-item__content {
        margin: 0 15px !important;
        flex: 1;
    }
}
/deep/.el-form {
    /deep/.el-input__inner,
    /deep/.el-textarea__inner,
    /deep/.el-date-editor {
        width: 400px;
    }
}

.form,
.demo {
    // height: calc(100vh - 230px) !important;
    overflow: auto;
    .form-box-title {
        font-size: 14px;
        font-weight: bold;
        background-color: #f8f8f8;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        margin-bottom: 30px;
    }
}
.opeart-btn {
    position: absolute;
    background: #fff;
    width: 100%;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);

    height: 60px;
    line-height: 60px;
    padding-left: 15px;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    // background-color: red;
}
.table-list {
    margin-top: 10px;
    display: flex;
    .table-item {
        border: 1px solid #409eff;
        border-radius: 4px;
        color: #409eff;
        font-size: 12px;
        height: 32px;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: 10px;
        position: relative;
        &:hover {
            .table-item-close {
                opacity: 1;
                transform: translate(0);
            }
        }
    }
    .table-item-close {
        color: #f56c6c;
        transform: translate(10px);
        opacity: 0;
        transition: all 0.15s;
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
