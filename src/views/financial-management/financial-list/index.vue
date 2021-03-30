<template>
  <div class="finacialContainer">
    <!-- 项目财务列表 -->
    <div>
      <!-- 头部元素 -->
      <div>
        <el-select v-model="type" placeholder="请选择项目类型" size="small" style="margin-right:20px">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="status" placeholder="请选择项目状态" size="small" style="margin-right:20px">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="way" placeholder="请选择项目接入方式" size="small" style="margin-right:20px">
          <el-option
            v-for="item in wayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button icon="el-icon-search" type="primary" size="small" style="margin-left:20px">筛选</el-button>
        <div style="margin-left: 20px;display:inline-block;margin-top:15px">
          <el-input v-model="keyword" placeholder="请按照关键字搜索" size="small">
            <template slot="append">搜索</template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: '', // 项目类型
      status: '', // 项目状态
      // 类型下拉框
      typeOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 状态下拉框
      statusOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 接入方式下拉框
      wayOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .finacialContainer{
    width: 95%;
    height: 100%;
    // background-color: red;
    margin: 10px auto;
    ::v-deep .el-input-group__append{
      background-color: #1990FF;
      color: #fff;
      border-color: #1990FF;
    }
  }
</style>
