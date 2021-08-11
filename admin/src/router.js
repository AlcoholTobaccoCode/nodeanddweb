import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'

//* 分类新增、编辑
import CategoriesEdit from './views/Categories/CategoriesEdit.vue'
//* 分类列表
import CategoriesList from './views/Categories/CategoriesList.vue'
//* 物品新增、编辑
import ItemEdit from './views/Items/ItemEdit.vue'
//* 物品列表
import ItemList from './views/Items/ItemList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        //* 分类相关
        {
          path: '/categories/create', //* 新建
          name: 'CategoriesEdit',
          component: CategoriesEdit
        }, {
          path: '/categories/list', //* 列表
          name: 'CategoriesList',
          component: CategoriesList
        }, {
          path: '/categories/create/:id', //* 编辑
          name: 'CategoriesEdit',
          component: CategoriesEdit,
          //* 将 url 后面任何的参数都注入到 CategoriesEdit 里面, 这样在该页面使用 props 可以直接接受
          props: true
        },
        //* 物品相关
        {
          path: '/items/create', //* 新建
          name: 'ItemEdit',
          component: ItemEdit
        },
        {
          path: '/items/create/:id', //* 编辑
          name: 'ItemEdit',
          component: ItemEdit,
          props: true
        },
        {
          path: '/items/list', //* 列表
          name: 'ItemList',
          component: ItemList
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
