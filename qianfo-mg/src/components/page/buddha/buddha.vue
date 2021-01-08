<template>
    <div>
        <List :dataUrl="dataUrl" :metaUrl="'com.cq1080.buddhawall.bean.entity.Buddha'" @delete="doDelete"
         @meta="meta" ref="list">
            <template slot="addition-table-actions" slot-scope="scope">
                <el-button class="m-r-20" type="text" @click="lookDetail(scope.item.row)">查看详情</el-button>
            </template>
        </List>
        <Dialog 
        :showStatus='showStatus' 
        @close='showStatus=false'
        buttonName="关闭"
        title='详情'
        >
        <template slot="form">
            <Detail-show :setting='setting'></Detail-show>
        </template>
        </Dialog>
    </div>
</template>

<script>
import List from '@/components/view/ListT';
import Template from '../../common/template.vue';
export default {
    props:{
        dataUrl:{
            default:'buddha'
        }
    },
    components: {
        List,
        Dialog:()=>import('@/components/view/dialog'),
        DetailShow:()=>import('@/components/view/detailShow')
    },
    data(){
        return {
            showStatus:false,
            setting:{},
        }
    },
    methods: {
        lookDetail(e){
            this.setting = {
                labelWidth:110,
                info:e,
                meta:[
                    {name:'佛像信息',title:true},
                    {name:'佛像名称',key:'buddhaHallName'},
                    {name:'横坐标',key:'x'},
                    {name:'纵坐标',key:'x'},
                    // {name:'佛像位置',key:'number'},
                    {name:'功德姓名',key:'name'},
                    {name:'联系方式',key:'phone'},
                    // {name:'认捐方式',key:''},
                    {name:'认捐时间',key:'expires',type:'DATETIME'},
                    {name:'佛像图片',key:'picture',type:'IMAGE'},
                    {name:'显示信息',title:true},
                    {name:'跑马灯效果',key:'marquee',type:'MAP',map:{
                        POLLING_ORDER:{name:'顺序轮询'}
                    }},
                    {name:'佛乐播放方式',key:'buddhaMusicMethod',type:'MAP',map:{
                        RANDOM:{name:'随机播放',color:''},
                        SPECIFY:{name:'指定佛乐',color:''},
                    }},
                    {name:'佛乐类型',key:'buddhaLanguageClassificationId'},
                    {name:'佛乐',key:'buddhaMusics',type:"ARRAY"},
                    {name:'祝福语播放方式',key:'buddhaLanguageMethod',type:'MAP',map:{
                        RANDOM:{name:'随机播放',color:''},
                        SPECIFY:{name:'指定祝福语',color:''},
                    }},
                    {name:'祝福语类型',key:'buddhaMusicClassificationId'},
                    {name:'祝福语',key:'buddhaLanguages',type:"ARRAY"},
                ]
            },
            this.showStatus=true

        },
        meta(meta) {
            meta.insertable = false;
            meta.edit = false;
            console.log(meta)
            meta.subs.forEach(it=>{
                if(it.key=='picture'){
                    it.type="IMAGE"
                }
                if(it.key=='pledgers'){
                    it.displayInList=true
                    it.type="JSON"
                }
                if(it.key=='number'){
                    it.displayInList=false
                }
                if(it.key=='x'||it.key=='y'){
                    it.displayInList=true
                }
                if(it.key=='buddhaHallId'){
                    it.optionsUrl='universal/buddhahalllist'
                }
            })
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