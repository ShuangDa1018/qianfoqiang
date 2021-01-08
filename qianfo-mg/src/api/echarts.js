import Echarts from "echarts"
import func from "./global_func";

/**
 * setting:{
 *  el:"", //dom元素
 *  option:{ //配置
 * 
 *  }
 * }
 */
function drawBar({
    el,
    option
}) {
    let xAxis = option.xAxis;
    let yAxis = option.yAxis;
    let grid = option.grid;
    let legend = option.legend;
    let tooltip = option.tooltip;
    let options = {
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        },

        legend: {

        },
        grid: {
            left: grid && grid.left ? grid.left : 20,
            right: grid && grid.right ? grid.right : 20,
            top: grid && grid.top ? grid.top : 20,
            bottom: grid && grid.bottom ? grid.bottom : 20,
            containLabel: true,
        },
        title: {
            text: option.title
        },
        xAxis: {
            type: xAxis.type ? xAxis.type : 'category',
            data: xAxis.data,
            axisLabel: {
                rotate: xAxis.rotate ? xAxis.rotate : 0
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                },

            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: yAxis && yAxis.type ? yAxis.type : 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                },

            },
        },
        series: []
    }
    option.series.forEach(it => {
        let item = {
            type: "bar",
            data: it.data,
            barMaxWidth: 60,
            barMinWidth: 20,
            label: {
                show: true,
                position: "top"
            },
            barWidth: it.barWidth ? it.barWidth : 40,
            itemStyle: {
                color: it.color ? it.color : ""
            }
        }
        options.series.push(item)
    })
    let chart = Echarts.init(document.getElementById(el));
    chart.setOption(options)
    return chart;
}


function drawLine({
    el,
    option
}) {
    let xAxis = option.xAxis;
    let yAxis = option.yAxis;
    let grid = option.grid;
    let tooltip = option.tooltip;
    let options = {
        color: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
        grid: {
            left: grid && grid.left ? grid.left : 20,
            right: grid && grid.right ? grid.right : 20,
            top: grid && grid.top ? grid.top : 20,
            bottom: grid && grid.bottom ? grid.bottom : 20,
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        },
        title: {
            text: option.title
        },
        xAxis: {
            type: xAxis.type ? xAxis.type : 'category',
            data: xAxis.data,
            axisLabel: {
                rotate: xAxis.rotate ? xAxis.rotate : 0
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                },

            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: yAxis && yAxis.type ? yAxis.type : 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#666"
                },

            },
        },
        series: []
    }
    option.series.forEach(it => {
        let item = {
            type: "line",
            data: it.data,
            symbolSize: it.symbolSize ? it.symbolSize : 8,
            itemStyle: {
                color: it.color ? it.color : ""
            },
            smooth: it.smooth ? true : false,
            label: {
                show: true,
                position: "top"
            },
            lineStyle: {
                width: it.lineWidth ? itt.lineWidth : 4
            }
        }
        options.series.push(item)
    })

    let chart = Echarts.init(document.getElementById(el));
    chart.setOption(options)
    return chart;
}


export default {
    drawLine: drawLine,
    drawBar: drawBar
}