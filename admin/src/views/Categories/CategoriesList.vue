<template>
<div>
  <h1>分类列表</h1>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="220"></el-table-column>
    <el-table-column prop="parent.name" label="上级分类名称"></el-table-column>
    <el-table-column prop="name" label="分类名称"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    //* 请求数据列表
    this.fetch();
  },
  methods: {
    //* 查找列表
    async fetch() {
      const res = await this.$http.get('rest/categories');
      //* 没有父级数据渲染优化
      for (let i in res.data) {
        let item = res.data[i];
        if (item.parent == null) {
          item.parent = {
            name: '/',
            _id: ''
          };
        }
      }
      this.items = res.data;
    },
    //* 删除
    async remove(row) {
      this.$confirm(`确定分类删除 "${row.name}"？`, "警告，该操作不可逆！", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`);
        let type = 'fail',
          message = '失败';
        if (res.data.success) {
          type = 'success';
          message = '成功';
        }
        this.$message({
          type: type,
          message: `分类 ${row.name} 删除${message}！`
        });
        //* 更新列表
        this.fetch();
      }).catch(() => {});
    }
  }
}
</script>
