<template>
  <div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      addInfo:{
        buddhaHallId:sessionStorage.getItem('buddhaHallId'),
        type:1,
        weChatCode:sessionStorage.getItem('qianfoqiang_code')
      },
      userData:null,
    }
  },
  mounted(){
    if(!sessionStorage.getItem('qianfoqiang_loginMessage')){
       this.login()
    }
  },
    methods:{
      login(){
        this.$axios.post('/app/user/login',this.addInfo).then(res=>{
          sessionStorage.setItem('qianfoqiang_loginMessage',JSON.stringify(res.data))
        })  
      },
    }
} 
</script>

<style>

</style>