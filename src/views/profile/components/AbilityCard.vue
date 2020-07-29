<template>
    <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>能力值</span>
    </div>
    <div class="user-profile">
      <div class="box-center">
          <div :id="id" :class="className" :style="{height:height,width:width}" />
      </div>
    </div>
  </el-card>
</template>
<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
export default {
    name:'AbilityCard',
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
            default: [0,0,0,0,0,0]
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
            radar: [
                {
                    indicator: [
                        { text: '动态规划', max: 100 },
                        { text: '数据结构', max: 100 },
                        { text: '数论', max: 100 },
                        { text: '解析几何', max: 100 },
                        { text: '图论', max: 100 },
                        { text: '思维', max: 100 }
                    ],
                    center: ['50%', '50%'],
                    radius: '60%',
                    
                }
            ],
            series: [
                {
                    type: 'radar',
                    radarIndex: 0,
                    data: [
                        {
                            value: this.chartData,
                            areaStyle: {
                                opacity: 0.8,
                                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                                    {
                                        color: '#B8D3E4',
                                        offset: 0
                                    },
                                    {
                                        color: '#72ACD1',
                                        offset: 1
                                    }
                                ])
                            },
                            lineStyle:{
                                color:['#CBD']
                            },
                            symbolSize:0
                            
                        }
                    ]
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
