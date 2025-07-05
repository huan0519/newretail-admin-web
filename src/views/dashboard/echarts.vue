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
            <dv-border-box-8 :reverse="true">
              <div style="display: flex; flex-direction: column; height: 100%;">
                <dv-decoration-7 style="width:220px;height:30px;color: azure; margin: 20px auto; text-align: center;font-weight: bold">本月各方药制作统计图</dv-decoration-7>
                <dv-scroll-ranking-board :config="config" style="width:400px;height:500px;padding:20px" />
              </div>
              
            </dv-border-box-8>

          </div>
          <!--右边一列-->
          <div class="column">
            <dv-border-box-12>
              <div ref="regionChart" style="width: 100%; height: 100%;"></div>
            </dv-border-box-12>
            <dv-border-box-1>
              <div ref="deviceChart" style="width: 100%; height: 100%; min-width: 0; box-sizing: border-box;"></div>
            </dv-border-box-1>

          </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </dv-full-screen-container>
  
</template>
<script>
import echarts from 'echarts'
import { color } from 'echarts/lib/export';

export default {
  data() {
    return {
      chart: null,
      echarts: null,
      // dv-scroll-ranking-board 配置
      config: {
        data: [
          { name: '四君子汤', value: 320 },
          { name: '六味地黄丸', value: 280 },
          { name: '小青龙汤', value: 250 },
          { name: '补中益气汤', value: 210 },
          { name: '当归四逆汤', value: 180 },
          { name: '逍遥散', value: 150 },
          { name: '柴胡疏肝散', value: 120 },
          { name: '生脉散', value: 243 },
          { name: '龙胆泻肝汤', value: 132 },
          { name: '四物汤', value: 281 },
          { name: '血府逐瘀汤', value: 104 },
        ],
        color: ['#117BF5', '#00C8FC', '#3FFCC8', '#71B0FC', '#2E4B66', '#FFFFFF', '#003261'],
        unit: '份'
      }
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
        this.initRegionChart();
        this.initDeviceChart();
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
          this.initRegionChart();
          this.initDeviceChart();
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
        title:{
          text:"当日方药总计图",
          left: 'center',
          top:'2%',
          textStyle:{
            color:'#fff'
          }
          
        },
        
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'left',
          orient: 'vertical',
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
                fontSize: 20,
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
          text: '方药一周统计图',
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
    },
    initRegionChart() {
      if (!this.echarts) {
        console.error('ECharts not loaded');
        return;
      }
      const container = this.$refs.regionChart;
      if (!container) {
        console.error('Region chart container not found');
        return;
      }
      if (container.offsetHeight === 0) {
        container.style.height = '200px';
      }
      const myChart = this.echarts.init(container);
      const option = {
        title: {
          text: '六大地区中药产量统计',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#117BF5',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['华北地区', '华东地区', '华南地区', '华中地区', '西南地区', '西北地区'],
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '产量(吨)',
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLabel: {
            color: '#fff'
          }
        },
        series: [{
          name: '中药产量',
          type: 'bar',
          data: [1250, 1890, 1560, 2100, 980, 1350],
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#117BF5' },
                { offset: 0.5, color: '#00C8FC' },
                { offset: 1, color: '#3FFCC8' }
              ]
            },
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#71B0FC' },
                  { offset: 0.5, color: '#2E4B66' },
                  { offset: 1, color: '#003261' }
                ]
              }
            }
          },
          label: {
            show: true,
            position: 'top',
            color: '#fff',
            fontSize: 12
          }
        }]
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        if (myChart) {
          myChart.resize();
        }
      });
    },
    initDeviceChart() {
      if (!this.echarts) {
        console.error('ECharts not loaded');
        return;
      }
      const container = this.$refs.deviceChart;
      if (!container) {
        console.error('Device chart container not found');
        return;
      }
      if (container.offsetHeight === 0) {
        container.style.height = '200px';
      }
      const myChart = this.echarts.init(container);
      const option = {
        title: {
          text: '设备运行状态监控',
          left: 'center',
          top: 10,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderColor: '#117BF5',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          left: '5%',
          top: 'middle',
          textStyle: {
            color: '#fff',
            fontSize: 11
          },
          itemWidth: 12,
          itemHeight: 8
        },
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: ['25%', '60%'],
            center: ['65%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              color: '#fff',
              fontSize: 12
            },
            labelLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: [
              { 
                value: 35, 
                name: '正常运行', 
                itemStyle: { color: '#3FFCC8' }
              },
              { 
                value: 12, 
                name: '待机状态', 
                itemStyle: { color: '#00C8FC' }
              },
              { 
                value: 8, 
                name: '维护中', 
                itemStyle: { color: '#117BF5' }
              },
              { 
                value: 5, 
                name: '故障停机', 
                itemStyle: { color: '#FF6B6B' }
              },
              { 
                value: 3, 
                name: '离线状态', 
                itemStyle: { color: '#FFA500' }
              }
            ]
          }
        ]
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
  align-items: center;
  justify-content: center;
}
.dv-border-box-1{
  height: 50%;
  display: flex;
  box-sizing: border-box;
  min-width: 0; /* 防止flex子元素溢出 */
}
</style>
