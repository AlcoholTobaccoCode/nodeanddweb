const express = require('express')

const app = express();

app.use(require('cors')());
app.use(express.json());

/**
 * 静态文件托管
 * 使我们的 uploads 文件可以通过 /upload 来访问
*/
app.use('/uploads', express.static(__dirname + '/upload'));

//* 引用数据库
require('./plugins/db')(app);
//* 导入 admin 相关 api
require('./routes/admin')(app);

app.listen(3000, () => {
  console.info('🚀 ~ http://localhost:3000');
});