<template>
    <div class="container">
        <div class="main-top" v-if="url3==url">
            <div id="main1"></div>
            <div id="main2"></div>
        </div>
        <div class="main-top">
            <div id="main3"></div>
            <div id="main4"></div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    props:{
        url3:{
            default:'index/buddhacountbymonth'
        },
        url4:{
            default:'index/usercountbymonth'
        }
    },
    data() {
        return {
            data1: null,
            data2: null,
            data3: null,
            defaultData:[],
            url:null,
        };
    },
    mounted() {
        this.url='index/buddhacountbymonth'
        if(this.url3==this.url){
            this.getData1();
        }
        for(let i = 0 ;i<12;i++){
            this.defaultData.push({count:0})
        }
        this.getData2();
        this.getData3();
    },
    methods: {
        getData1() {
            this.$axios.get('index/buddhacountstatistic').then((res) => {
                this.data1 = res; //佛像数量统计
                this.echartMain1();
                this.echartMain2();
            });
        },
        getData2() {
            this.$axios.get(this.url3).then((res) => {
                this.data2 = res; //月统计佛像数量
                this.echartMain34(res, true);
            });
        },
        getData3() {
            this.$axios.get(this.url4).then((res) => {
                // this.data3 = this.defaultData.push res; //用户数量
                this.echartMain34(res, false);
            });
        },

        echartMain1() {
            let data1 = this.data1.map((it) => {
                return { value: it.buddhaCount, name: it.buddhaHallName };
            });
            let option = {
                title: {
                    text: '佛殿佛像统计图',
                    left: 'center'
                },
                color: ['#CD8020', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '统计',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        label: {
                            color: '#000',
                            formatter: ['{b|{b}}', '{d| {d}%}'].join(''),
                            rich: {
                                b: {
                                    color: '#999',
                                    margin: 20,
                                    lineHeight: 10
                                },
                                c: {
                                    backgroundColor: {
                                        image: 'xxxx.jpg'
                                    },
                                    height: 30
                                },
                                d: {
                                    backgroundColor: {
                                        image: 'xxxx.jpg'
                                    },
                                    height: 10
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: data1
                    },
                    {
                        name: '占位',
                        type: 'pie',
                        silent: true,
                        center: ['50%', '50%'],
                        radius: 30,
                        hoverAnimation: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [
                            {
                                value: 1,
                                name: '占位2'
                            }
                        ],
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 10
                            }
                        }
                    }
                ]
            };
            const myEchart = echarts.init(document.getElementById('main1'));
            myEchart.setOption(option);
        },
        echartMain2() {
            const xData = this.data1.map((it) => {
                return it.buddhaHallName;
            });
            const yData = this.data1.map((it) => {
                return it.buddhaCount;
            });
            console.log(xData);
            let option = {
                title: {
                    text: '佛殿佛像柱状图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.6)'
                    // formatter:"{b}:{c}"
                },
                legend: {
                    // 修改legend的高度宽度
                    itemHeight: 5,
                    itemWidth: 24,
                    data: [
                        {
                            name: '供温',
                            icon: 'rect' // legend的icon
                        },
                        {
                            name: '回温',
                            icon: 'rect'
                        },
                        {
                            name: '压力值(Mpa)',
                            icon: 'rect'
                        }
                    ],
                    textStyle: {
                        color: '#B4B4B4'
                    },
                    top: '7%',
                    // 选择关闭的legend
                    selected: {
                        回温: false
                    }
                },
                grid: {
                    x: '8%',
                    width: '82%',
                    y: '12%'
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: xData,
                        axisLabel: {
                            rotate: 30,
                            margin: 20
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(108,80,243,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ]), //柱状图圆角
                                barBorderRadius: [30, 30, 0, 0]
                            }
                        },
                        barWidth: '60%',
                        data: yData,
                        label: {
                            show: true
                        }
                    }
                ]
            };
            const myEchart = echarts.init(document.getElementById('main2'));
            myEchart.setOption(option);
        },
        echartMain34(data, or) {
            if (!data) {
                return;
            }
            const yData = data.map((it) => {
                return it.count;
            });
            const xData = data.map((it, index) => {
                return index;
            });
            if (or) {
                var main = 'main3';
                var text = '佛像增长趋势图'
            } else {
                var main = 'main4';
                var text = '用户增长趋势图'
            }
            let option = {
                title: {
                    text: text,
                    left: 'center'
                },
                legend: {
                    show: true,
                    icon: 'circle',
                    top: '13%',
                    itemWidth: 6,
                    itemHeight: 6,
                    itemGap: 25
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xData,
                        axisLine: {
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#CD8020'
                            },
                            margin: 15,
                            formatter: '{value}月'
                        },
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#CD8020'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        type: 'line',
                        data: yData,
                        symbolSize: 6,
                        symbol: 'circle',
                        smooth: true,
                        lineStyle: {
                            color: '#CD8020'
                        },
                        itemStyle: {
                            normal: {
                                color: '#CD8020',
                                borderColor: '#CD8020'
                            }
                        },
                        // areaStyle: {
                        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        //         {
                        //             offset: 0,
                        //             color: '#1E87FFb3'
                        //         },
                        //         {
                        //             offset: 1,
                        //             color: '#9E87FF03'
                        //         }
                        //     ])
                        // },
                        emphasis: {
                            itemStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: '#CD8020'
                                        },
                                        {
                                            offset: 0.4,
                                            color: '#CD8020'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#fff'
                                        },
                                        {
                                            offset: 0.7,
                                            color: '#fff'
                                        },
                                        {
                                            offset: 0.8,
                                            color: '#fff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#fff'
                                        }
                                    ]
                                },
                                borderColor: '#CD8020',
                                borderWidth: 2
                            }
                        }
                    }
                ]
            };
            const myEchart = echarts.init(document.getElementById(main));
            myEchart.setOption(option);
        }
    }
};
</script>

<style scoped lang='less'>
.container {
    overflow-y: scroll;
    height: 100%;
    // width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
    .main-top {
        display: flex;
        justify-content: space-around;
    }
    #main1,#main2,#main3,#main4  {
        width: 600px;
        height: 400px;
        margin-bottom: 20px;
    }
   
}
</style>