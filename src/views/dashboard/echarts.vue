<template>
  <div class="body">
    <div class="viewport">
      <div class="column">
      <!--概览--> 
      <div></div>
      <!--监控--> 
      <div></div>
      <!--点位--> 
      <div></div> 
      </div>
    <div class="column">
      <!--地图--> 
      <div></div>
      <!--⽤户--> 
      <div></div> 
    </div>
    <div class="column">
      <!--订单--> 
      <div></div>
      <!--销售--> 
      <div></div> 
      <div>
        <!--渠道--> 
        <div></div>
        <!--季度--> 
        <div></div>
      </div>
      <!--排⾏--> 
      <div></div> 
    </div>
  </div> 
  </div>
  
</template>
<script>
import * as echarts from './row2/mixins/echarts.min.js';
import * as flexible from './row2/mixins/flexible.js';

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
.body{
 font-family: Arial, Helvetica, sans-serif;
 margin: 0;
 padding: 0;
 font-size: 0.5rem;
 line-height: 1.15;
 background: url(./images/bg.jpg) no-repeat 0 0 / cover;
}
h4,h3,ul{
 margin: 0;
 padding: 0;
 font-weight: normal;
}
ul{
 list-style: none;
}
a{
 text-decoration: none;
}
.viewport{
 max-width: 1240px;
 min-width: 1024px;
 margin: 0 auto;
 min-height: 660px;
 padding: 3.667rem 0.833rem 0;
//  background: url(../images/logo.png) no-repeat 0 0 / contain;
 display: flex;
}
.column{
 flex: 3;
 position: relative;
}
.column:nth-child(2){
 flex: 4;
 margin: 1.333rem 0.833rem 0;
}
@media screen and (max-width: 1024px) {
 html {
 font-size: 42.66px !important;
 }
 }
 @media screen and (min-width: 1920px) {
 html {
 font-size: 80px !important;
 }
 }
</style>
