<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="配方名称">
                <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
            </el-form-item>
            
            <el-form-item style="padding-left:30px">
                 <el-button type="default" @click="resetForm1('ruleForm')">搜索</el-button>
                <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'form-container',
        data() {
            return {
                formInline: {
                    name: '',
                    type: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$emit('submit', this.formInline)
            },
            resetForm1() {
                this.formInline = {
                    name: '',
                    type: ''
                };
                this.$emit('resetForm');

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .form-container {
        padding: 30px;
        background: #fff;
    }
</style>
