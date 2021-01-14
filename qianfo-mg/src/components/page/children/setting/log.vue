<template>
  <div>
        <List 
        dataUrl="bd/log"
       :tableMeta="tableMeta"
       disableTableAction="true"></List>
  </div>
</template>

<script>
import List from '@/components/view/ListT'
export default {
    components:{
        List
    },
    data(){
        return{
            tableMeta:{
                subs:[
                    {name:'用户名',key:'name',type:'TEXT',displayInList:true,searchable:true,},
                    {name:'用户Ip',key:'ip',type:'TEXT',displayInList:true,searchable:true,},
                    // {name:'登录token',key:'token',type:'TEXT',displayInList:true,searchable:false,},
                    {name:'登录时间',key:'createTime',type:'TIMESTAMP',displayInList:true,searchable:false,},
                ]
            }
        }
    },
    methods(){
        
    }
}
</script>

<style>

</style>