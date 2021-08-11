<template>
<div>
  <h1>{{id ? '编辑' : '新建'}}物品</h1>
  <el-form label-width="120px" @submit.native.prevent="save">
    <el-form-item label="名称">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <!-- E 名称 -->
    <el-form-item label="图标">
      <!-- <el-input v-model="model.icon"></el-input> -->
      <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false" :on-success="afterUpload" :before-upload="beforeUpload">
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
        icon: '' //* 物品图标
      },
      isJump: false, //* 保存成功是否跳转
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
  },
  methods: {
    //* 编辑时拉取数据
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
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
      const res = await this.$http[type](`rest/items${url}`, this.model);
      this.$message({
        type: 'success',
        message: `${res.data.name + message}成功！`
      });
      this.model.name = '';
      if (this.isJump) {
        this.model.parent = '';
        this.$router.push('/items/list');
      }
    },
    //*********************************************** S 图标上传
    //* 上传前
    beforeUpload(/* file */) {
      // eslint-disable-next-line no-console
      // console.log('✨ ~ file: ItemEdit.vue ~ line 83 ~ beforeUpload ~ file', file);
    },
    //* 上传后
    afterUpload(res, file) {
      // eslint-disable-next-line no-console
      console.log('✨ ~ file: ItemEdit.vue ~ line 89 ~ afterUpload ~ file', file);
      // eslint-disable-next-line no-console
      console.log('✨ ~ file: ItemEdit.vue ~ line 89 ~ afterUpload ~ res', res);

      this.$set(this.model, 'icon', res.url);
      // this.model.icon = res.url;
    },
    

    //*********************************************** E 图标上传 
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
