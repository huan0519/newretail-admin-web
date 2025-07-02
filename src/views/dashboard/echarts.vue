<template>
  <dv-full-screen-container style="margin:100px">
    <div>
      <div class="viewport">
        <!--头部-->
        <div class="header">
          <dv-border-box-11 title="智能煎煮面板"></dv-border-box-11>
        </div>
        <!--底部-->
        <div class="footer">
          <div class="columns">
            <!--左边一列-->
          <div class="column left-column">
            <dv-border-box-13>
              <div class="today_total" ref="chartContainer"></div>
            </dv-border-box-13>
            <dv-border-box-10>
              <div ref="chart_two"></div>
            </dv-border-box-10>
          </div>
          <!--中间一列-->
          <div class="column">
            <dv-border-box-8 :reverse="true" class="">设备场地图</dv-border-box-8>

          </div>
          <!--右边一列-->
          <div class="column">
            <dv-border-box-12>方药中药</dv-border-box-12>
            <dv-border-box-1>设备数量</dv-border-box-1>

          </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </dv-full-screen-container>
  
</template>
<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      chart: null,
      echarts: null
    };
  },
  components: {
    
  },
  async mounted() {
    // 动态导入echarts
    try {
      const echartsModule = await import('echarts');
      this.echarts = echartsModule.default || echartsModule;
      this.$nextTick(() => {
        this.initChart();
        this.initChartTwo();
      });
    } catch (error) {
      console.error('Failed to load echarts:', error);
      // 如果动态导入失败，尝试使用CDN
      this.loadEchartsFromCDN();
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods:{
    loadEchartsFromCDN() {
      // 如果动态导入失败，使用CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
      script.onload = () => {
        this.echarts = window.echarts;
        this.$nextTick(() => {
          this.initChart();
          this.initChartTwo();
        });
      };
      document.head.appendChild(script);
    },
    initChart(){
      if (!this.echarts) {
        console.error('ECharts not loaded');
        return;
      }
      
      const container = this.$refs.chartContainer;
      if (!container) {
        console.error('Chart container not found');
        return;
      }
      
      // 确保容器有尺寸
      if (container.offsetHeight === 0) {
        container.style.height = '300px';
      }
      
      const myChart = this.echarts.init(container);
      const option = {
        text:"当日方药总计图",
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '今日方药统计图',
            color: ['#117BF5','#00C8FC','#3FFCC8','#71B0FC','#2E4B66','#FFFFFF','#003261'],
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '四君子汤' },
              { value: 735, name: '六味地黄丸' },
              { value: 580, name: '小青龙汤' },
              { value: 484, name: '补中益气汤' },
              { value: 300, name: '当归四逆汤' }
            ]
          }
        ]
      };
      myChart.setOption(option);
      
      // 添加窗口大小变化监听
      window.addEventListener('resize', () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    initChartTwo() {
      if (!this.echarts) {
        console.error('ECharts not loaded');
        return;
      }
      const container = this.$refs.chart_two;
      if (!container) {
        console.error('Chart two container not found');
        return;
      }
      if (container.offsetHeight === 0) {
        container.style.height = '250px';
      }
      const myChart = this.echarts.init(container);
      const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      const data = [120, 132, 101, 134, 90, 230, 210]; // 示例数据
      const colors = ['#117BF5','#00C8FC','#3FFCC8','#71B0FC','#2E4B66','#FFFFFF','#003261'];
      const option = {
        title: {
          text: '方药一周制作图',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: week,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            color: '#fff'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#2E4B66'
            }
          },
          axisLabel: {
            color: '#fff'
          }
        },
        series: [{
          data: data,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: function(params) {
              return colors[params.dataIndex % colors.length];
            },
            borderColor: '#fff',
            borderWidth: 2
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 0.16, color: colors[1] },
                { offset: 0.32, color: colors[2] },
                { offset: 0.48, color: colors[3] },
                { offset: 0.64, color: colors[4] },
                { offset: 0.80, color: colors[5] },
                { offset: 1, color: colors[6] }
              ]
            },
            width: 4
          },
          label: {
            show: true,
            color: '#fff',
            fontSize: 14
          }
        }]
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        if (myChart) {
          myChart.resize();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.today_total {
  width: 100%;
  height: 250px;
  position: relative;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1); /* 添加背景色以便调试 */
}
.left-column {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  height: 100%;
}
.head {
  padding: 0;
  z-index: 10; 
}

.viewport {
  width: 1240px;
  margin: 0 auto;
  height: 660px;
  padding: 3.667rem 0.833rem 0;
  background: url(./images/bg.jpg) no-repeat 0 0 / cover;
  position: relative;
  z-index: 1; 
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 设置固定高度 */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.footer {
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  width: 100%;
}
.columns {
  display: flex;
  justify-content: space-between; /* 确保列与列之间有一定的间距 */
  width: 100%;
  height: 100%;
}

.column {
  flex: 1;
  margin: 0 10px; /* 列之间的间距 */
  height: 100%;
}
.border-box-8 {
  height: 100%;
  display: flex;
  align-items: flex-start; 
  justify-content: flex-start; 
  padding: 10px;
  box-sizing: border-box;
}
.dv-border-box-13{
  height: 50%;
  display: flex;
  padding: 10px;
  position: relative; /* 添加定位属性 */
  z-index: 50;   

}
.dv-border-box-10{
  height: 50%;
  padding: 10px;
  display: flex;
}
.dv-border-box-12{
  height: 49%;
  padding: 10px;
  display: flex;
}
.dv-border-box-1{
  height: 50%;
  display: flex;
  padding: 10px;
}
</style>
