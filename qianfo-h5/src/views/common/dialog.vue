<template>
  <div>
      <van-dialog v-model="show"  
      :message="message" 
    :cancelButtonText="cancelText"
     :showCancelButton="showCancel"
     :confirmButtonText="confirmText"
     @confirm="confirm" 
     @cancel="cancel"
     confirmButtonColor="#b50201">
      </van-dialog>
  </div>
</template>

<script>
export default {
    props:['show','message','confirmText','cancelText','showCancel' ],
    methods:{
        confirm(){
            this.$emit('confirm')
        },
        cancel(){
            this.$emit('cancel')
        }
    }
}
</script>

<style>

/deep/.van-dialog{
  background: #b50201 !important;
}

</style>