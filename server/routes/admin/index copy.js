module.exports = app => {
  const express = require('express');

  const router = express.Router();

  //* 加载模型
  const Category = require('../../modules/Category');

  //* 新增
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  //* 渲染列表
  router.get('/categories', async (req, res) => {
    //* populate 关联、取出
    const items = await Category.find().populate('parent').limit(10);
    res.send(items);
  });

  //* 根据 id 查找指定数据
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id).populate('parent');
    res.send(model);
  });

  //* 编辑
  router.put('/categories/:id', async (req, res) =>{
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  //* 删除
  router.delete('/categories/:id', async (req, res) =>{
    const model = await Category.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  app.use('/admin/api', router);
}