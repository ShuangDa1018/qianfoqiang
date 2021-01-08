<template>
    <div>
        <List
            :dataUrl="dataUrl"
            :metaUrl="'com.cq1080.buddhawall.bean.entity.Donate'"
            @delete='doDelete'
            @meta="meta"
            ref="list"
        >
        
        </List>

    </div>
</template>

<script>
import List from '@/components/view/ListT';
export default {
    props:{
        dataUrl:{
            default:'/donate'
        }
    },
    components: {
        List,
    },
    data() {
        return {
            // dataUrl: '/donate',
        };
    },
    methods: {
        meta(meta){
            meta.insertable=false
            meta.edit=false
            meta.subs.forEach(it => {
                if(it.key=='content'){
                    it.displayInList=true
                    it.sort=5
                }
                if(it.key =='name'){
                    it.displayInList=true
                    it.sort=5
                }
                if(it.key=='userAvatar'){
                    it.displayInList=true
                    it.type="IMAGE"
                    it.sort=4
                }
                if(it.key=='buddhaHallId'){
                    it.optionsUrl='universal/buddhahalllist'
                }
            });
            
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