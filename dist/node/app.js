const express = require('express') //引入express 模块
const app = express()              //创建实例
const mysql = require('mysql')     //引入mysql 模块
//需要npm i body-parser  用来获取客户端携带的请求体
const bodyParser = require("body-parser")
const utils = require("./utils/index")

//官网复制
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 创建数据库连接 填入数据库信息 
//填自己数据库的信息!!!!!!!!!!!
const conn = mysql.createConnection({
  user: 'root',          //用户名
  password: '12345678',	//密码
  host: '8.140.62.241',		//主机（默认都是local host）
  database: 'testdata',       //数据库名
  port: '3306',
  useConnectionPooling: true
})
// 测试连接
conn.connect(err => {
  if (err === null) {
    console.log("连接成功！");
  } else {
    console.error(err);
  }
})
// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
})

app.get('/history/getHistory', (req, res) => {
  const id = utils.getIpAddress();
  // 查询语句 data 得到的是一个数组，增删改得到的是受影响的行数
  conn.query('select * from history where id = ?', [id], (err, data) => {
    if (err) return console.log(err.message); // 连接失败
    // if (data.length === 0) return console.log('数据为空'); // 数据长度为0 则没有获取到数据
    // 否则获取成功，将结果返回给客户端res.send
    res.send({
      code: 200,
      msg: '数据获取成功',
      data
    })
  })
})

// POST 请求示例：插入数据
app.post('/history/setHistory', (req, res) => {
  const { name, day } = req.body; // 从请求的 body 中获取要插入的数据
  const id = utils.getIpAddress();
  console.log(req.body, id);
  conn.query('INSERT INTO history (id, name, day) VALUES (?, ?, ?)', [id, name, day], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error inserting data' });
      return;
    }
    res.send({
      code: 200,
      msg: '数据新增成功'
    });
  });
});

app.get('/enterdata/getAllData', (req, res) => {
  const id = utils.getIpAddress();
  // 查询语句 data 得到的是一个数组，增删改得到的是受影响的行数
  conn.query('select * from enterdata where id = ?', [id], (err, data) => {
    if (err) return console.log(err.message); // 连接失败
    // if (data.length === 0) return console.log('数据为空'); // 数据长度为0 则没有获取到数据
    // 否则获取成功，将结果返回给客户端res.send
    res.send({
      code: 200,
      msg: '数据获取成功',
      data: data[0] || ''
    })
  })
})

//插入数据
app.post('/enterdata/setAllData', (req, res) => {
  const { textarea } = req.body; // 从请求的 body 中获取要更新的数据
  const id = utils.getIpAddress();
  conn.query(`INSERT INTO enterdata (id, textarea) VALUES (?, ?) ON DUPLICATE KEY UPDATE id = ?, textarea = ?`, [id, textarea, id, textarea], (error, results) => {
    if(error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating data' });
      return;
    }
    res.send({
      code: 200,
      msg: '数据更新成功'
    });
  });
});

// 删除数据
app.post('/enterdata/deleteData', (req, res) => {
  const id = utils.getIpAddress();
  conn.query('DELETE FROM enterdata WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error delete data' });
      return;
    }
    res.send({
      code: 200,
      msg: '数据删除成功'
    });
  });
});

app.post('/history/deleteData', (req, res) => {
  const id = utils.getIpAddress();
  conn.query('DELETE FROM history WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error delete data' });
      return;
    }
    res.send({
      code: 200,
      msg: '数据删除成功'
    });
  });
});