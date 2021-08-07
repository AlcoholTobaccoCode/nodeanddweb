module.exports = app => {
  const express = require('express');

  const router = express.Router({
    mergeParams: true //* 1. 合并参数 
  });

  //* 加载模型
  // const Category = require('../../modules/Category');

  //* 新增
  router.post('/', async (req, res) => {
    //* 关联最后一行 resource
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  //* 渲染列表
  router.get('/', async (req, res) => {
    //* populate 关联、取出
    // const items = await req.Model.find().populate('parent').limit(10);
    //* 动态参数查询
    const queryOption = {};
    if (req.Model.modelName === 'Category') {
      queryOption.populate = 'parent';
    }
    const items = await req.Model.find().setOptions(queryOption).limit(10);
    res.send(items);
  });

  //* 根据 id 查找指定数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id).populate('parent');
    res.send(model);
  });

  //* 编辑
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  //* 删除
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  /**
   * 0. :resource 动态匹配资源
   */
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    //* 动态加载模型
    //* 2. 动态引用
    //* 将小写的复数形式转换成大写的单数形式
    const moduleName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../modules/${moduleName}`);
    next();
  }, router);
}