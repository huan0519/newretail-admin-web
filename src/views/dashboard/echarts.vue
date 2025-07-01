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
            <dv-border-box-13>今日统计方药</dv-border-box-13>
            <dv-border-box-10>本月统计方药</dv-border-box-10>
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
import * as datav from '@jiaminghi/data-view'
import * as echarts from './row2/mixins/echarts.min.js';
import * as flexible from './row2/mixins/flexible.js';
import * as jquery from './row2/mixins/jquery.min.js';


export default {
  data() {
    return {
      
    };
  },
  components: {
    
  },
  async mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
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
