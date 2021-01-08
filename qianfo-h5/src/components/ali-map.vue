<template>
  <!-- <van-overlay :lock-scroll="true" :z-index="zIndex" :show="show"> -->
  <div v-show="show">
    <div id="container" @click.stop></div>
    <div class="top-input">
      <div class="city" @click.stop="showCity = true">
        <div class="city-detail">{{ defaultCity }}</div>
        <van-icon name="arrow-down" />
      </div>
      <input
        id="tipinput"
        autocomplete="off"
        placeholder="输入地址信息查询"
        v-model="searchValue"
      />
      <div class="close" @click.stop="close">关闭</div>
    </div>
    <div id="panel">
      <div class="panel-loading" v-if="!searchResult || !searchResult.length">
        <van-loading color="#35c9af" />
      </div>
      <div
        class="search-item"
        v-for="(item, index) in searchResult"
        :key="index"
        @click="selectAddress(index)"
      >
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="address">
            {{ item.pname }}{{ item.cityname }}{{ item.adname
            }}{{ item.address }}
          </div>
        </div>
        <div class="select">
          <van-icon name="success" v-if="item.select" />
        </div>
      </div>
      <div class="btn-padding" v-if="selected"></div>
      <div class="padding-btn" v-if="selected">
        <button @click="confirmSelect">确定选择</button>
      </div>
    </div>
    <van-popup v-model="showCity" position="bottom" >
      <van-area title="标题" :area-list="areaList" @confirm="confirmArea" @change="changeArea" @cancel="showCity=false" :columns-num="2"
    /></van-popup>
  </div>
</template>

<script>
import { Overlay, Icon, Loading, Popup, Area,Dialog } from "vant";
import area from "./info/area"
export default {
  name: "ali-map",
  props: ["zIndex", "show"],
  components: {
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Area.name]: Area,
  },
  data() {
    return {
      showCity: false,
      zoom: 11,
      center: [116.397428, 39.90923],
      searchValue: "",
      placeSearch: "",
      defaultCity: "重庆",
      map: "",
      searchResult: "",
      areaList:"",
    };
  },
  created() {},
  mounted() {

    this.areaList = area;
    this.initMap();
  },
  watch: {
    searchValue(val) {
      if (this.marker) {
        this.map.remove(this.marker);
      }
      this.searchInput(val);
    },
    show(val) {
      if (!val) {
        this.searchResult.map((it) => {
          it.select = false;
          return it;
        });
        this.searchResult = [...this.searchResult];
      }else{
        this.getLocation();
        this.map.setZoom(12)
      }
    },
  },

  computed: {
    selected() {
      let filter =
        this.searchResult && this.searchResult.length
          ? this.searchResult.filter((it) => {
              return it.select;
            })
          : [];
      return filter && filter.length ? true : false;
    },
  },
  methods: {
    changeArea(e){
    },
    confirmArea(e){
      let city = e[1].name.replace('市',"");
      this.defaultCity = city;
      this.map.setCity(city)
     this.searchInput(this.searchValue)
     this.showCity=false;
    },
     /**
     * 定位当前位置
     */
    getLocation() {
      let that =this;
      let geolocation = new AMap.Geolocation({
        timeout: 10 /** 未在10秒内返回定位信息，返回超时错误信息“TIMEOUT */,
        extensions: "all" /** 定位成功，获取经纬度逆地理编码解析的内容 */,
      });
      geolocation.getCurrentPosition(); /** 定位 */
      AMap.event.addListener(geolocation, "complete", (result)=>{
        that.selectMap(result.position)
      }); //返回定位信息
      AMap.event.addListener(geolocation, "error", (error)=>{
        if(this.show){
          Dialog({
            message:error.message
        });
        }
      }); //返回定位出错信息
    },
    initMap() {
      var map = new AMap.Map("container", {
        zoom: 13, //级别
        resizeEnable: true,
        dragEnable: true,
        zoomEnable: true,
      });
      this.map = map;
      let that = this;
      AMap.plugin(
        [
          "AMap.PlaceSearch",
          "AMap.Geocoder",
          "AMap.Marker",
          "AMap.Icon",
          "AMap.CitySearch",
          "AMap.Geolocation"
        ],
        function () {
          //异步加载插件
       

          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity(function (status, result) {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
            
              // let citys = "重庆市上海市北京市天津市";
              that.defaultCity = result.city.replace("市", "");
              if (result && result.city && result.bounds) {
                var citybounds = result.bounds;
              }
            }
          });
          that.getLocation();
          /** 初始化搜索 */
          that.placeSearch = new AMap.PlaceSearch({
            city: that.defaultCity,
            pageSize: 20,
            extensions: "all",
            citylimit: true,
            type:
              "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施",
          }); //构造地点查询类
          map.on("click", function (e) {
            that.searchValue = "";
            that.selectMap({
              lng:e.lnglat.getLng(),
              lat:e.lnglat.getLat()
            });
          });
          that.searchInput();
        }
      );
    },
    /**
     * POI查询
     */
    searchInput(val) {
      this.searchResult = [];
      this.placeSearch.setCity(this.defaultCity)
      this.placeSearch.search(val, (status, result) => {
     
        this.searchResult = result.poiList.pois;
      });
    },
    /**
     * 选点查询
     */
    selectMap(location) {
   
      let that = this;
      if (this.marker) {
        this.map.remove(this.marker);
      }
      var icon = new AMap.Icon({
        size: new AMap.Size(40, 50), // 图标尺寸
        image: require("@/assets/images/current-address.png"), // Icon的图像
        anchor: "center",
      });
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(location.lng, location.lat),
        icon: icon,
        title: "选择地址",
        draggable: true,
      });
      let geocoder = new AMap.Geocoder({
        city: "023", //城市设为北京，默认：“全国”
        radius: 1000, //范围，默认：500
      });
      
      geocoder.getAddress(location.lng + "," + location.lat, function (status, result) {
        that.searchInput(result.regeocode.formattedAddress);

      });
      this.map.add(this.marker);
      this.map.setCenter({
        position:new AMap.LngLat(location.lng, location.lat)
      })
    },
    /**
     * 选择地址
     */
    selectAddress(index) {
      this.searchResult.forEach((it, ix) => {
        it.select = ix == index;
      });
      this.searchResult = [...this.searchResult];
    },
    /**
     * 关闭
     */
    close() {
      this.$emit("close");
    },
    /**
     * 确定选择
     */
    confirmSelect() {
      let item = this.searchResult.filter((it) => {
        return it.select;
      })[0];
      let address =
        item.name +
        "-" +
        item.pname +
        item.cityname +
        item.adname +
        item.address;
      this.$emit("select",address)
    },
  },
};
</script>

<style>
#container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.top-input {
  position: fixed;
  top: 0;
  z-index: 1000;
  left: 0;
  width: 100%;
  padding: 7px 15px 7px 10px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
}

#tipinput {
  padding: 10px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  border-radius: 16px;
  flex: 1;
}
.city {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.city-detail {
  max-width: 45px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: normal;
  white-space: nowrap;
}
#panel {
  position: fixed;
  bottom: 0;
  top: 60vh !important;
  width: 100%;
  left: 0 !important;
  overflow: auto;
  height: 40vh;
  background-color: white;
}
#panel .search-item {
  padding: 8px 10px;
  box-sizing: border-box;
  font-size: 14px;
}
.search-item {
  display: flex;
  align-items: center;
}
.search-item .info {
  flex: 1;
}
.search-item .select {
  width: 50px;
  text-align: right;
  color: #35c9af;
}
.search-item .name {
}
.search-item .address {
  color: #999;
}
.panel-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.close {
  background-color: #35c9af;
  margin-left: 10px;
  height: 100%;
  font-size: 14px;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
}
.btn-padding {
  height: 45px;
}
.padding-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.padding-btn button {
  height: 45px;
  width: 100%;
  background-color: #35c9af;
  outline: none;
  border: none;
  color: white;
}
</style>