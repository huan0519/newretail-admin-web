<template>
    <div class="opi-model-container">
        <el-card v-for="(item, index) in tableData" :key="index" class="cooking-card">
            <div class="card-content">
                <div class="info-row">
                    <div class="info-item">
                        <span class="label">第一次加水量:</span>
                        <span class="value">{{ item.water_one }} mL</span>
                    </div>
                    <div class="info-item">
                        <span class="label">浸泡时间:</span>
                        <span class="value">{{ item.jing_time }} min</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-item">
                        <span class="label">武火时间:</span>
                        <span class="value">{{ item.wuhuo_time }} min</span>
                    </div>
                    <div class="info-item">
                        <span class="label">一煎时间:</span>
                        <span class="value">{{ item.first_time }} min</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-item">
                        <span class="label">第二次加水时间:</span>
                        <span class="value">{{ item.water_two }} min</span>
                    </div>
                    <div class="info-item">
                        <span class="label">二煎时间:</span>
                        <span class="value">{{ item.second_time }} min</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-item">
                        <span class="label">吸水量:</span>
                        <span class="value">{{ item.water_account }} mL</span>
                    </div>
                    <div class="info-item">
                        <span class="label">蒸发量:</span>
                        <span class="value">{{ item.evaporation }} mL</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
      name: 'opi-Model',
        data() {
            return {
                tableData: [
                    {
                        // number: "1",
                        water_one: "1000",
                        jing_time: "25",
                        wuhuo_time:"30",
                        first_time:"55",
                        water_two:"45",
                        second_time:"25",
                        water_account:"250.98",
                        evaporation:"749.02"
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
    .opi-model-container {
        
        .cooking-card {
            margin-bottom: 20px;
            height: 200px;
            width: 100%;
            
            .card-content {
                .info-row {
                    display: flex;
                    
                    &:last-child {
                        margin-bottom: 0;
                    }
                    
                    .info-item {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        padding: 8px 0;
                        
                        .label {
                            font-weight: 600;
                            color: #606266;
                            min-width: 120px;
                            margin-right: 10px;
                        }
                        
                        .value {
                            color: #303133;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

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
