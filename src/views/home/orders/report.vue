<template>
  <div class="about" id="main"></div>
</template>
 
<script>
import {getReports} from 'network/orders.js'
export default {
  data() {
    return {
      chartsdata:{},
    }
  },
  mounted(){
    getReports()
      .then((res) =>{
        this.chartsdata = res.data.data
          var myChart = this.$echarts.init(document.getElementById("main"));
          myChart.setOption(res.data.data)
      })
  },
  // mounted() {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = this.$echarts.init(document.getElementById("main"));
  //   console.log(this.chartsdata);
  //   // 绘制图表
  //   if(this.chartsdata.series.length){

    
  //   myChart.setOption({
  //     title: {
  //       text: '堆叠区域图'
  //   },
  //  tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //           type: 'cross',
  //           label: {
  //               backgroundColor: '#6a7985'
  //           }
  //       }
  //   },
  //   legend:this.chartsdata.legend,
  //   grid: this.chartsdata.arid,
  //   xAxis: this.chartsdata.xAxis,
  //   yAxis: this.chartsdata.yAxis,
  //   series: [
  //       {
  //           name: '邮件营销',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [120, 132, 101, 134, 90, 230, 210]
  //       },
  //       {
  //           name: '联盟广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [220, 182, 191, 234, 290, 330, 310]
  //       },
  //       {
  //           name: '视频广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [150, 232, 201, 154, 190, 330, 410]
  //       },
  //       {
  //           name: '直接访问',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [320, 332, 301, 334, 390, 330, 320]
  //       },
  //       {
  //           name: '搜索引擎',
  //           type: 'line',
  //           stack: '总量',
  //           label: {
  //               normal: {
  //                   show: true,
  //                   position: 'top'
  //               }
  //           },
  //           areaStyle: {},
  //           data: [820, 932, 901, 934, 1290, 1330, 1320]
  //       }
  //   ]
  //   });
  //   }
  // },
};
</script>
 
<style lang="less" scoped>
#main {
  height: 400px;
  width: 100%;
}
</style>