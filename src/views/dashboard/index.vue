<template>
  <div class="pageContainer">
    <!-- <Row1/>
    <Row2/>
    <Row3></Row3> -->
    <Echarts></Echarts>
  </div>
</template>

<script>
const Row2Tab = () => import("./row2Tab/row2Tab");
const Row3 = () => import("./row3/index");
const Row2 = () => import("./row2/index");
const Row1 = () => import("./row1");
const Echarts = () => import("./echarts")
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
  components: {
    Echarts
    // Row1,
    // Row2,
    // // Row2Tab,
    // Row3
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pageContainer {
  width: 100%;
}
</style>
