<template>
  <div class="btn-audio">
      <audio controls controlslist="nodownload">
    <source :src="src" type="audio/mp3" />您的浏览器不支持 HTML5 audio 标签。
  </audio>
  </div>
</template>

<script>
export default {
    props:['src']
}
</script>

<style>
audio {
  width: 100%;
  height: 40px;
  outline: none;
  filter: invert(180); 
}
audio::-webkit-media-controls-enclosure {
  background: rgb(129, 73, 200);
  /* 滤镜反转为 rgba(0, 162, 255, 1);rgba(255, 93, 0, 0.8)  #7eb637   10,10,10  #757575 */
  border-radius: 4px;
}
.media-controls-container,
.media-controls-container * {
  background: rgb(129, 73, 200);
  /* //滤镜反转为 rgba(0, 162, 255, 1);rgba(255, 93, 0, 0.8)  #7eb637 */
  border-radius: 4px;
}
audio::-webkit-media-controls-play-button {
  height: 22px;
  width: 22px;
  min-width: 22px;
  border-radius: 50%;
  flex-basis: 22px;
}

/* // 音量隐藏 */
audio::-webkit-media-controls-volume-control-container {
  display: none;
}

audio::-webkit-media-controls-current-time-display {
   /* //设置弹性盒对象元素的顺序 */
  order: 1;
  color: #000;
  text-shadow: unset;
}

audio::-webkit-media-controls-time-remaining-display {
  order: 2;
  color: rgba(0, 0, 0, 0.6);
  text-shadow: unset;
}
</style>