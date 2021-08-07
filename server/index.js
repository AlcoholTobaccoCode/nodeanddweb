const express = require('express')

const app = express();

app.use(require('cors')());
app.use(express.json());

//* 引用数据库
require('./plugins/db')(app);
//* 导入 admin 相关 api
require('./routes/admin')(app);

app.listen(3000, () => {
  console.info('🚀 ~ http://localhost:3000');
});