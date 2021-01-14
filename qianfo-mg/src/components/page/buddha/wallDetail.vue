<template>
    <div >
        <div class="big-box" v-for="(item, y) in data.x" :key="y">
            <div class="min-box" v-for="(arr, x) in data.y" :key="x">
                <el-image
                    fit="fill"
                    class="image"
                    :preview-src-list="
                        Info.map((it) => {
                            return it.picture;
                        })
                    "
                    :src="
                        Info.filter((it) => {
                            return it.x == x + 1 && it.y == y + 1 ? true : false;
                        }).length
                            ? Info.filter((it) => {
                                  return it.x == x + 1 && it.y == y + 1 ? true : false;
                              })[0].picture
                            : ''
                    "
                >
                    <div slot="error" class="image-error">
                        <div style="text-align:center">无</div>
                        <div class="text">(横:{{x+1}},纵:{{y+1}})</div>
                    </div>
                </el-image>
                <div  class="box-button">
                    <div
                        class="delete el-icon-edit-outline"
                        @click="
                            edit(
                                x + 1,
                                y + 1,
                                Info.filter((it) => {
                                    return it.x == x + 1 && it.y == y + 1 ? true : false;
                                }).length
                                    ? Info.filter((it) => {
                                          return it.x == x + 1 && it.y == y + 1 ? true : false;
                                      })[0].id
                                    : ''
                            )
                        "
                    ></div>
                    <el-popconfirm
                        title="确定删除吗"
                        @onConfirm="
                            del(
                                Info.filter((it) => {
                                    return it.x == x + 1 && it.y == y + 1 ? true : false;
                                }).length
                                    ? Info.filter((it) => {
                                          return it.x == x + 1 && it.y == y + 1 ? true : false;
                                      })[0].id
                                    : ''
                            )
                        "
                    >
                        <div slot="reference" class="delete el-icon-delete"></div>
                    </el-popconfirm>
                </div>
                <!-- <div v-else class="box-button">
                    <div class="delete el-icon-delete" @click="del(j + 1, i + 1)"></div>
                </div> -->
            </div>
        </div>
        <Dialog :showStatus="showStatus" width="600px" :loading="showLoading" title="设置千佛墙" @close="showStatus = false" @save="save">
            <template slot="form">
                <el-form :rules="rules" ref="form" :model="addInfo" label-width="120px">
                    <div class="form-title">佛像信息</div>
                    <el-form-item label="佛像名称" prop="name">
                        <el-input v-model="addInfo.name" placeholder="请输入佛像名称"></el-input>
                    </el-form-item>
                    <el-form-item label="佛像位置">
                        <el-input v-model="number" disabled placeholder="请输入佛像位置"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label='认捐方式' prop='expires'>
                        <el-input v-model="addInfo.name" placeholder='请选择认捐方式'></el-input>
                    </el-form-item> -->
                    <el-form-item label="认捐时间" prop="expires">
                        <!-- <el-input v-model="addInfo.expires" placeholder="请输入认捐时间"></el-input> -->
                        <el-date-picker
                            v-model="addInfo.expires"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="center"
                            value-format="timestamp"
                            :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <div class="for-item">
                        <div class="for-index" v-for="(item, i) in addInfo.pledgers" :key="i">
                            <el-form-item
                                label="功德姓名"
                                :prop="'pledgers.' + i + '.name'"
                                :rules="{ required: true, message: '请输入功德姓名', trigger: 'blur' }"
                            >
                                <el-input v-model="item.name" placeholder="请输入功德姓名"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="联系方式"
                                :prop="'pledgers.' + i + '.phone'"
                                :rules="{ required: true, message: '请输入联系方式', trigger: 'blur' }"
                            >
                                <el-input v-model="item.phone" placeholder="请输入联系方式"></el-input>
                            </el-form-item>
                            <div class="el-icon-circle-close" @click="delAdd(i)" v-show="addInfo.pledgers.length >1 "></div>
                        </div>
                        <div @click="add" v-show="addInfo.pledgers.length < 3" class="el-icon-circle-plus-outline"></div>
                    </div>

                    <el-form-item label="佛像图片" prop="picture">
                        <Upload-img
                            maxLength="1"
                            :list="addInfo.picture"
                            @change="change"
                            :image="true"
                            :accept="true"
                        ></Upload-img>
                    </el-form-item>
                    <div class="form-title">显示设置</div>
                </el-form>
                <Form-date :addInfo="addInfo" :noSave="true"></Form-date>
            </template>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['children'],
    components: {
        Dialog: () => import('@/components/view/dialog'),
        UploadImg: () => import('@/components/common/uploadImg'),
        FormDate: () => import('@/components/page/common/formDate')
    },
    data() {
        return {
            id: this.$route.query.id,
            data: { x: Number(this.$route.query.x), y: Number(this.$route.query.y) },
            number: '',
            Info: [],
            showStatus: false,
            showLoading: false,
            addInfo: {
                buddhaMusics: [],
                marquee: 'POLLING_ORDER',
                buddhaHallId: this.$route.query.id,
                buddhaLanguages: [],
                buddhaLanguageClassificationId: null,
                buddhaMusicClassificationId: null,
                buddhaLanguageMethod: 'RANDOM',
                buddhaMusicMethod: 'RANDOM',
                picture: '',
                x: 0,
                y: 0,
                pledgers: [{ name: '', phone: '' }]
            },
            rules: {
                name: [{ required: true, message: '请输入佛像名称', trigger: 'blur' }],
                number: [{ required: true, message: '请输入佛像位置', trigger: 'blur' }],
                // expires:[{required:true,message:'请输入认捐时间',trigger:'blur'}],
                expires: [{ required: true, message: '请输入认捐方式', trigger: 'blur' }],
                // pledgers:{
                //     name:[{required:true,message:'请输入功德姓名',trigger:'blur'}],
                //     phone:[{required:true,message:'请输入联系方式',trigger:'blur'}],
                // },
                // picture: [{ required: true, message: '请上传佛像图片', trigger: 'blur' }],
                buddhaMusicMethod: [{ required: true, message: '请选择佛乐播放方式', trigger: 'blur' }],
                buddhaLanguageMethod: [{ required: true, message: '请选择祝福语播放方式', trigger: 'blur' }]
            },
            options: [],
            checkList: [],
            opMusic1: [
                { value: 'RANDOM', label: '随机播放' },
                { value: 'SPECIFY', label: '指定佛乐' }
            ],
            opMusic2: [
                { value: 'RANDOM', label: '随机播放' },
                { value: 'SPECIFY', label: '指定祝福语' }
            ],
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            },
            loading:true,
        };
    },
    computed: {},
    watch: {
        showStatus(val) {
            if (!val) {
                this.addInfo = {
                    buddhaMusics: [],
                    marquee: 'POLLING_ORDER',
                    buddhaHallId: this.$route.query.id,
                    buddhaLanguages: [],
                    buddhaLanguageClassificationId: null,
                    buddhaMusicClassificationId: null,
                    buddhaLanguageMethod: 'RANDOM',
                    buddhaMusicMethod: 'RANDOM',
                    picture:'http://192.168.10.192:8015/storage/2021/01/04/18/ac93493baf764c9c89ccb20b60dae91bneed-delete.png',
                    // x:0,
                    // y:0,
                    pledgers: [{ name: '', phone: '' }]
                };
            }
        }
    },
    mounted() {
        //是否子平台
        if (this.children) { 
            this.getBuddhahall();
            return;
        }
        this.getData();
    },
    methods: {
        // 子平台x  y总数
        getBuddhahall() {
            this.$axios.get('bd/buddha/getbuddhahall').then((res) => {
                this.data.x = res.x;
                this.data.y=res.y;
                this.id=res.id
                this.getDataChidren();
            });
        },
        // 子平台获取数据
        getDataChidren() {
            this.$axios.get('bd/buddha/bybuddhall').then((res) => {
                this.Info = res;
            });
        },

        // 总平台获取数据
        getData() {

            this.$axios.get('buddha/bybuddhall', { params: { buddhaId: this.id } }).then((res) => {
                this.Info = res;
            });
        },
        edit(x, y, id) {
            this.showStatus = true;
            this.number = `横坐标：${x},纵坐标：${y}`;
            this.addInfo.x = x;
            this.addInfo.y = y;
            this.Info.forEach((it) => {
                if (it.id == id) {
                    this.addInfo = it;
                }
            });
        },
        change(e) {
            this.addInfo.picture = e;
        },
        // 保存
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.showLoading = true;
                    this.$axios
                        .post(this.children?'bd/buddha':'buddha', this.addInfo)
                        .then((res) => {
                            this.showLoading = false;
                            this.showStatus = false;
                            this.getData();
                        })
                        .catch(() => {
                            this.showLoading = false;
                        });
                }
            });
        },
        // 删除
        del(id) {
            if (!id) {
                this.$message.error('这个位置没有佛像');
                return;
            }
            this.$axios.delete(this.children?'bd/buddha':'buddha', { params: { ids: id } }).then((res) => {
                this.$message.success('删除成功');
                this.getData();
            });
        },
        add() {
            this.addInfo.pledgers.push({ name: '', phone: '' });
        },
        delAdd(index) {
            this.addInfo.pledgers.splice(index, 1);
        }
    }
};
</script>

<style lang="less" scoped>
.big-box {
    white-space: nowrap;
}
.el-image {
    color: #909399;
    background: #f5f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
}
.min-box {
    display: inline-block;
    position: relative;
    overflow: auto;
    width: 80px;
    height: 80px;
    box-shadow: 0 0 12px 2px #cd8020;
    border-radius: 7px;
    margin: 5px;
    .image {
        width: 100%;
        height: 100%;
    }
    &:hover {
        .box-button {
            opacity: 1;
            transform: translateX(0);
        }
        box-shadow: 0px 0px 12px 7px #cd8020;
    }
    .box-button {
        position: absolute;
        z-index: 10;
        right: 2px;
        top: 2px;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s;
        .delete {
            cursor: pointer;
            color: rgba(199, 35, 35, 0.76);
            display: block;
            margin-top: 5px;
        }
    }
}
.form-title {
    background: #f8f8f8;
    font-size: bold;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 10px;
}
.for-item {
    border-radius: 10px;
    // box-shadow: 0 0 12px 2px #cd8020;
    text-align: center;
    padding: 5px 0;
    box-sizing: border-box;
    width: 470px;
    margin: 20px 0;

    .for-index {
        position: relative;
        .el-icon-circle-close {
            position: absolute;
            opacity: 0;
            transform: translate(20);
            right: -5px;
            top: -5px;
            font-size: 20px;
            transition: all 0.3s;
            color: brown;
            cursor: pointer;
        }
        &:hover {
            .el-icon-circle-close {
                opacity: 1;
                transform: translate(0);
            }
        }
    }

    .el-icon-circle-plus-outline {
        font-size: 30px;
        margin-left: 100px;
        cursor: pointer;
    }
}
/deep/.el-input--small .el-input__inner {
    width: 350px;
}
/deep/.form[data-v-2ff9cbc6] {
    display: block;
}
.image-error{
    display: flex;
    justify-content: center;
    align-items: center;
    .text{
        font-size: 1px;
    }
}
</style>