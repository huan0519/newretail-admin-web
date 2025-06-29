<template>
    <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="NO" width="180">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>NO</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.number }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="第一次加水量" width="180">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>第一次加水量</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.water_one }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="浸泡时间">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>浸泡时间</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.jing_time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="武火时间">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>武火时间</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.wuhuo_time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="一煎时间">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>一煎时间</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.first_time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="第二次加水时间">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>第二次加水时间</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.water_two}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="二煎时间">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>二煎时间</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.second_time }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="吸水量">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>吸水量</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.water_account }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="蒸发量">
        <template #default="scope">
          <el-table style="width: 100%">
            <el-table-column label="属性" width="100">
              <template #default>
                <span>蒸发量</span>
              </template>
            </el-table-column>
            <el-table-column label="值" width="100">
              <template #default>
                <span>{{ scope.row.evaporation }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    export default {
      name: 'opi-Model',
        data() {
            return {
                tableData: [
                    {
                        number: "",
                        water_one: "",
                        jing_time: "",
                        wuhuo_time:"",
                        first_time:"",
                        water_two:"",
                        second_time:"",
                        water_account:"",
                        evaporation:""


                    },
                ]
            };
        },
        components: {
            
        },
        mounted() {
            

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .selector {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0 20px 20px 20px;

        .selectedMaterial {
            padding-left: 50px;
            background: #f4f4f5;
            height: 30px;
            line-height: 30px;
        }

        .selector-check {
            overflow: hidden;

            ul {
                overflow: hidden;

                li {
                    float: left;
                    width: 160px;
                    height: 118px;
                    list-style: none;
                    position: relative;
                    margin: 0 5px;

                    video {
                        width: 100%;
                        height: 100%;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .bofang {
                        position: absolute;
                        top: 50px;
                        left: 68px;

                        .svg-icon {
                            font-size: 30px;
                            color: #fff;
                        }
                    }

                    .img {
                        width: 100%;
                        height: 100%;
                    }

                    div {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
        }
    }
</style>
