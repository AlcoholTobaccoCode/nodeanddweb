<template>
<div>
  <h1>{{id ? '编辑' : '新建'}}分类</h1>
  <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="上级分类">
      <el-select v-model="model.parent">
        <el-option v-for="item in parentOptions" :key="item._id" :label="item.name" :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <!-- E 上级分类 -->
    <el-form-item label="名称">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <!-- E 名称 -->
    <el-form-item label="保存成功跳转">
      <el-switch v-model="isJump"></el-switch>
    </el-form-item>
    <!-- E 名称 -->
    <el-form-item label="">
      <el-button type="primary" native-type="submit">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      model: {
        name: '', //* 当前菜单名
        parent: null, //* 当前选中父级数据
      },
      isJump: false, //* 保存成功是否跳转
      parentOptions: [] //* 父级菜单
    }
  },
  props: {
    id: {}
  },
  components: {},
  mounted() {},
  created() {
    //* 如果有 id , 通过 id 获取数据
    this.id && this.fetch();
    //* 获取父级菜单列表
    this.fetchParentOptions();
  },
  methods: {
    //* 编辑时拉取数据
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      //* 当前查询菜单 name
      this.model.name = res.data.name;
      //* 已选中父级
      if (res.data.parent) {
        this.model.parent = res.data.parent._id;
      }
    },
    //* 新增数据
    async save() {
      let url = '',
        type = 'post', //* 请求类型, 默认新增 post
        message = this.id ? '编辑' : '新增';
      if (this.id) {
        url = `/${this.id}`;
        type = 'put';
      }
      const res = await this.$http[type](`rest/categories${url}`, this.model);
      this.$message({
        type: 'success',
        message: `${res.data.name + message}成功！`
      });
      this.model.name = '';
      if (this.isJump) {
        this.model.parent = '';
        this.$router.push('/categories/list');
      }
    },
    //* 获取父级菜单
    async fetchParentOptions() {
      const res = await this.$http.get('rest/categories');
      this.parentOptions = res.data;
      this.parentOptions.unshift({
        name: '/',
        _id: null
      });
    }
  },
}
</script>

<style scoped>
</style>
