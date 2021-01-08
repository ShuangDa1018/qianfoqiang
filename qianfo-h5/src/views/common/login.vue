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
        weChatCode:sessionStorage.getItem('code')
      },
      userData:null,
    }
  },
  created(){
    this.login()
  },
    methods:{
      login(){
        this.$axios.post('/app/user/login',this.addInfo).then(res=>{
          sessionStorage.setItem('loginMessage',JSON.stringify(res.data))
        })  
      },
    }
} 
</script>

<style>

</style>