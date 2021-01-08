<template>
    <div class="content">
      <div class="image">
        <img src="http://192.168.10.192:8015/storage/2020/12/22/18/65796a14854c4e44a44134f4b1a1bd7e123.jpg" alt="">
      </div>
      <span >预约认领佛像成功</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.content{
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/redBack.png') no-repeat  ;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
.image{
  width: 80%;
  height: 50%;
  background: orange;
  margin-bottom: 1rem;
}

</style>