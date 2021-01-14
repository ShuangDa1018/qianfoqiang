<template>
    <div class="add-container" id="detailShow" :style="{ height: pageHeight }">
        <div class="form">
            <el-form>
                <div v-for="(item, index) in meta" :key="index">
                    <div class="form-box-title" v-if="!item.hide && item.title">{{ item.name }}</div>
                    <el-form-item :label="item.name" :label-width="setting.labelWidth + 'px'" v-if="!item.hide && !item.title">
                        <div v-if="item.type == 'TEXT' || !item.type">
                            <div v-if="detailInfo[item.key]">{{ detailInfo[item.key] }}{{ item.unit }}</div>
                            <div v-else>无</div>
                        </div>
                        <div v-if="item.type == 'JSON'">
                            <div v-for="(i, j) in detailInfo[item.key]" :key="j">
                                <div style="display: flex; justify-content: sapce-around; align-items: center">
                                    <span style="display: inline-block; min-width: 120px"
                                        ><span class="json-name">姓名：</span>{{ i.name }}
                                    </span>
                                    <span style="min-width: 120px"><span class="json-name"> 电话：</span> {{ i.phone }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.type=='MUSICA'">
                            <Audio style="width:50%" v-for="(d,j) in detailInfo[item.key]" :key="j" :src="d" ></Audio>
                        </div>
                        <div v-if="item.type == 'MAP'" :style="{ color: item.color ? item.color : item.map[detailInfo[item.key]].color }">
                            {{ item.map[detailInfo[item.key]].name }}
                        </div>
                        <div v-if="item.type == 'TIME' && !item.hide">{{ detailInfo[item.key] | dateTime }}</div>
                        <!-- <div v-if="item.type == 'ARRAY'">
                            {{ detailInfo[item.key].toString() }}
                        </div> -->

                        <div v-if="item.type == 'DATE' && !item.hide">{{ detailInfo[item.key] | dateTime([]) }}</div>
                        <div v-if="item.type == 'DATETIME' && !item.hide">{{ detailInfo[item.key] | dateTime(['h', 'm']) }}</div>
                        <div v-if="item.type == 'IMAGE' && !item.hide">
                            <el-image
                                fit="cover"
                                :src="detailInfo[item.key]"
                                :preview-src-list="[detailInfo[item.key]]"
                                style="width: 4rem; height: 4rem"
                            />
                        </div>
                        <div v-if="item.type == 'IMAGES' && !item.hide">
                            <template v-for="(it, ix) in detailInfo[item.key]">
                                <el-image
                                    fit="cover"
                                    :key="ix"
                                    :src="it[item.imageKey]"
                                    :preview-src-list="
                                        detailInfo[item.key].map((it) => {
                                            return it[item.imageKey];
                                        })
                                    "
                                    style="width: 4rem; height: 4rem"
                                    :class="ix < detailInfo[item.key].length - 1 ? 'margin-right-10' : ''"
                                />
                                {{ it[item.imageKey] }}
                            </template>
                        </div>
                        <div v-if="(item.type == 'COMMODITY' || item.type == 'SERVICE') && !item.hide">
                            <div class="commodty-item" v-for="(item, index) in detailInfo[item.key]" :key="index">
                                <div class="coverPicture">
                                    <el-image :src="item.coverPicture" :preview-src-list="[item.coverPicture]">
                                        <div slot="placeholder" class="image-slot">
                                            加载中
                                            <span class="dot">...</span>
                                        </div>
                                    </el-image>
                                </div>
                                <div class="commodity-info">
                                    <div class="info-name">{{ item.name }}</div>
                                    <div class="info-sku">{{ item.sku || item.color }}</div>
                                </div>
                                <div class="commodity-number">
                                    <div class="number-price">￥{{ item.price }}</div>
                                    <div class="number-text">x {{ item.number }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-if="item.type == 'PATH'">
                            <el-timeline>
                                <el-timeline-item
                                    icon="el-icon-location-information"
                                    color="#67C23A"
                                    size="large"
                                    v-for="(item, index) in detailInfo[item.key]"
                                    :key="index"
                                >
                                    <el-card>
                                        <p>第{{ item.number }}站</p>
                                        <h4>{{ item.province }}{{ item.city }}{{ item.district }}{{ item.address }}</h4>
                                        <p>{{ item.note }}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-form-item>
                    <div></div>
                </div>
            </el-form>
        </div>
        <!-- <div class="opeart-btn">
            <el-button @click="goBack">返回</el-button>
        </div> -->
    </div>
</template>

<script>
/**
 * meta设置
 *
 * name 名称
 * key
 * type 类型 【TEXT】文字显示
 *
 */
export default {
    props: ['setting'],
    components:{
        Audio:()=>import('@/components/view/audio')
    },
    data() {
        return {
            detailInfo: {},
            meta: {}
        };
    },
    watch: {
        'setting.info': {
            handler(val) {
                this.detailInfo = val;
            },
            deep: true,
            immediate: true
        },
        'setting.meta': {
            handler(val) {
                this.meta = val;
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        /**
         * 页面的高度
         */
        pageHeight() {
            return 'calc(100vh - ' + ((this.$props.setting.lessHeight ? this.$props.setting.lessHeight : 0) + 120) + 'px) !important';
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="less" scoped>
img-list {
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
    // overflow: auto;
    width: 100%;
    margin-bottom: 10px;
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

.margin-left-10 {
    margin-left: 10px;
}
.margin-right-10 {
    margin-right: 10px;
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
/deep/.el-timeline {
    max-width: 700px;
    .el-timeline-item__tail {
        left: 9px;
    }
    .el-timeline-item__node--large {
        width: 24px;
        height: 24px;
    }
    .el-timeline-item__icon {
        font-size: 15px;
    }
}
.commodty-item {
    width: 600px;
    display: flex;
    height: 110px;
    margin-bottom: 10px;
    .coverPicture {
        width: 100px;
        height: 100px;
        background-color: #f4f4f4;

        /deep/.el-image {
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 100px;
            font-size: 14px;
            color: #c0c4cc;
        }
    }
    .commodity-info {
        margin-left: 15px;
        flex: 1;
        .info-name {
        }
        .info-sku {
            background-color: #f8f8f8;
            color: #ccc;
            font-size: 12px;
            line-height: 25px;
            padding: 0 4px;
            display: inline-block;
        }
    }
    .commodity-number {
        width: 50px;
        text-align: center;
        .number-price {
            color: red;
        }
        .number-text {
            font-size: 12px;
        }
    }
}
.add-container {
    border: 0;
    padding: 0;
    padding-left: 20px;
}
</style>