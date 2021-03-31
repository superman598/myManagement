<template>
  <div class="projectContainer">
    <!-- 项目类型列表 -->
    <div class="projectContent">
      <!-- 表头和新增按钮 -->
      <div class="projectTitle" style="margin-bottom:30px;display:flex;justify-content:space-between;align-items:center">
        <h2>项目类型</h2>
        <el-button type="primary" @click="addProject">新增</el-button>
      </div>
      <!-- 表格内容 -->
      <div class="contentTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px"
          :header-cell-style="{background:'#99D4FF',color:'#000'}"
        >
          <el-table-column
            align="center"
            prop="number"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            prop="type"
            label="项目类型"
            width="150"
          />
          <el-table-column
            align="center"
            prop="remarks"
            label="备注"
          />
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
          />
          <el-table-column
            align="center"
            prop="operate"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          number: '1',
          type: '建筑',
          remarks: 'xxx',
          createTime: '2021-01-01'
        },
        {
          number: '2',
          type: '建筑',
          remarks: 'xxx',
          createTime: '2021-01-01'
        },
        {
          number: '3',
          type: '建筑',
          remarks: 'xxx',
          createTime: '2021-01-01'
        },
        {
          number: '4',
          type: '建筑',
          remarks: 'xxx',
          createTime: '2021-01-01'
        }
      ]
    }
  },
  methods: {
    // 新增项目
    addProject() {
      const h = this.$createElement
      this.$msgbox({
        title: '新增任务类型',
        message: h('el-form', null, [
          h('el-form-item', { style: { display: 'inline-block', width: '80px' }}, '类型名称:'),
          h('el-input', { attrs: { placeholder: '请输入任务' }, style: { display: 'inline-block', width: '200px', margin: '0 0 20px 10px' }}),
          h('br'),
          h('el-form-item', { style: { display: 'inline-block', width: '80px' }}, '备注:'),
          h('el-input', { attrs: { placeholder: '请输入', type: 'textarea', rows: '3' }, style: { display: 'inline-block', width: '200px', margin: '0 0 20px 10px' }})
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
   .projectContainer{
    width: 95%;
    height: 100%;
    // background-color: red;
    margin: 10px auto;
    .projectContent{
      margin: 40px 40px 0;
    }
  }
</style>
