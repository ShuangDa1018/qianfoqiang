<template>
 <div style="overflow:hidden">
    <Form :formSetting='formSetting' :defaultInfo='defaultInfo' @change='change' ></Form>
 </div>
</template>

<script>
import Form from '@/components/view/addForm'
export default {
    components:{
        Form
    },
    data(){
        return {
            defaultInfo:{},
            formSetting:{},
            formSetting:{
                url:'/buddhahall',
            backUrl:'/buddha/buddhahall',
                list:[
                    { name:'佛殿',title:true},
                   
                    {name:'佛殿名称',key:'name',required:true,},
                    {name:'横格',key:'x',required:true, },
                    {name:'纵格',key:'y',required:true,},
                    //  {name:'已用格数',key:'useNumber'},
                    // {name:'总格数',key:'totalNumber'},

                    // {name:'支付宝设置',title:true,},
                    // {name:'支付宝公钥',key:'alipayPublicKey',object:'aliPayConfig', type:'OBJECT'
                    // ,caption:'查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥'},
                    // {name:'应用ID',key:'appId',object:'aliPayConfig', type:'OBJECT',
                    // caption:'您的APPID，收款账号既是您的APPID对应支付宝账号'},
                    // {name:'商户私钥',key:'appPrivateKey',object:'aliPayConfig', type:'OBJECT',
                    // caption:'您的PKCS8格式RSA2私钥'},
                    // {name:'支付宝网关',key:'gatewayUrl',object:'aliPayConfig', type:'OBJECT'},
                    // {name:'服务器异步通知页面路径 ',key:'notifyUrl',object:'aliPayConfig', type:'OBJECT',
                    // caption:'需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问'},
                    // {name:'签名方式',key:'signType',object:'aliPayConfig', type:'OBJECT'},
                    {name:'微信支付设置',title:true,},
                    // {name:'appId(微信开放平台获取)',key:'appId',object:'weChatConfig', type:'OBJECT'},
                    // {name:'app密钥(微信开放平台获取)',key:'appKey',object:'weChatConfig', type:'OBJECT'},
                    // {name:'商户证书',key:'keyPath',object:'weChatConfig', type:'OBJECT'},
                    {name:'商户号(微信商户平台获取)',key:'mchId',object:'weChatConfig', type:'INPUT',required:true},
                    {name:'商户密钥(微信开放平台获取)',key:'mchKey',object:'weChatConfig', type:'INPUT',required:true},
                    // {name:'支付结果回调地址',key:'notifyUrl',object:'weChatConfig', type:'OBJECT'},
                ]
            }
        }
    },
    mounted(){
        this.getInfoValue()
    },
    methods:{
       getInfoValue(){
           let info = JSON.parse(sessionStorage.getItem('form'))
           let path = this.$route.path
           if(path.indexOf('Edit')>-1){
               const a= info.weChatConfig
               info.mchId= a.mchId
               info.mchKey= a.mchKey
               this.defaultInfo=info
               return
           }
           this.defaultInfo={}
       } ,
       change(){
           
       }
    },
}
</script>

<style>

</style>