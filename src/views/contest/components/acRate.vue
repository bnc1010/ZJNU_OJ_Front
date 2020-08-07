<template>
      <div class="box-center">
          <div :id="id" :class="className" :style="{height:height,width:width}" />
      </div>
</template>
<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
export default {
    name:'ACRate',
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
        },
        chartData: {
            type: Array,
            default: [
                {
                    name:'ac',
                    value:0
                },
                {
                    name:'wa',
                    value:0
                }

            ]
        }
    },
    watch:{
        chartData:{
            handler: function(newValue, olderValue){
                if(this.chart){
                    if(newValue){
                        this.setData(newValue)
                    }
                    else{
                        this.setData(olderValue)
                    }
                }
                else{
                    this.initChart()
                }
            },
            deep: true
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
        return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color : [ '#67C23A', '#F56C6C'],
            series: [
                {
                    name: 'Status',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: this.chartData,
                    label:{
                        position:'inside'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
        ]
        })
        },
        setData(data){
            this.chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: 'Status',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
        ]
        })
        }
    }
    }
    </script>
    <style lang="scss" scoped>
    .box-center {
    margin: 0 auto;
    display: table;
    }
</style>
