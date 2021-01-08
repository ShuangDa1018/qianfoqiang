<template>
  <div>
        <List 
        dataUrl="/log"
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
                    {name:'登录Ip',key:'ip',type:'TEXT',displayInList:true,searchable:true,},
                    {name:'登录token',key:'token',type:'TEXT',displayInList:true,searchable:false,},
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