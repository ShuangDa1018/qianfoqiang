<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.AccessBuddha'"
            @delete='doDelete'
            ref="list"
            @meta='meta'
        >
        </List>
    </div>
</template>

<script>
import List from '@/components/view/ListT';
export default {
    props:{
        dataUrl:{
            default:'/accessbuddha'
        }
    },
    components: {
        List,
    },
    data(){
        return{
            // dataUrl:'/accessbuddha'
        }
    },
    methods: {
        meta(meta){
            meta.insertable=false
            meta.edit=false
            meta.subs.forEach(it=>{
                if(it.key=='userPhone'){
                    it.displayInList=true
                }
                if(it.key=='buddhaHallId'){
                    it.optionsUrl='universal/buddhahalllist'
                }
            })
        },
        //删除
        doDelete(e){ 
            this.$axios.delete(this.dataUrl,
            {params:{ids:e.map(it=>{return it.id}).join(',')}})
            .then(()=>{
                this.$message.success('删除成功')
                this.$refs.list.doSearch()
            })
        }
    }
};
</script>

<style>
</style>