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

let baseurl = process.env.NODE_ENV === 'dev' ? '' : '/nodeapp';

// 创建数据库连接 填入数据库信息 
var pool = mysql.createPool({
  user: 'blackSige',          //用户名
  password: '12345678',	//密码
  host: '8.140.62.241',		//主机（默认都是local host）
  database: 'blacksige',       //数据库名
  port: '3306',
});

// 开启服务器
app.listen(3000, () => {
  console.log('服务器在3000端口开启。。。。。');
})

app.get(`${baseurl}/history/getHistory`, (req, res) => {
  const id = utils.getClientIp(req);
  // 查询语句 data 得到的是一个数组，增删改得到的是受影响的行数
  pool.getConnection(function (err, connection) {
    connection.query("select * from history where id = ?", [id], (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error query data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据获取成功',
          data: data || []
        })
      }
    });
    connection.release();
  });
})

// POST 请求示例：插入数据
app.post(`${baseurl}/history/setHistory`, (req, res) => {
  const { name, day } = req.body; // 从请求的 body 中获取要插入的数据
  const id = utils.getClientIp(req);
  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO history (id, name, day) VALUES (?, ?, ?)', [id, name, day], (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error inserting data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据更新成功',
          data: []
        })
        console.log(data);
      }
    });
    connection.release();
  });
});

app.get(`${baseurl}/enterdata/getAllData`, (req, res) => {
  const id = utils.getClientIp(req);
  pool.getConnection(function (err, connection) {
    connection.query('select * from enterdata where id = ?', [id], (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error query data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据获取成功',
          data: data || []
        })
      }
    });
    connection.release();
  });
})

//插入数据
app.post(`${baseurl}/enterdata/setAllData`, (req, res) => {
  const { textarea } = req.body; // 从请求的 body 中获取要更新的数据
  const id = utils.getClientIp(req);
  pool.getConnection(function (err, connection) {
    connection.query(`INSERT INTO enterdata (id, textarea) VALUES (?, ?) ON DUPLICATE KEY UPDATE id = ?, textarea = ?`, [id, textarea, id, textarea], (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error update data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据更新成功',
          data: []
        })
        console.log(data);
      }
    });
    connection.release();
  });
});

// 删除数据
app.post(`${baseurl}/enterdata/deleteData`, (req, res) => {
  const id = utils.getClientIp(req);
  pool.getConnection(function (err, connection) {
    connection.query('DELETE FROM enterdata WHERE id = ?', [id],  (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error delete data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据删除成功',
          data: []
        })
        console.log(data);
      }
    });
    connection.release();
  });
});

app.post(`${baseurl}/history/deleteData`, (req, res) => {
  const id = utils.getClientIp(req);
  pool.getConnection(function (err, connection) {
    connection.query('DELETE FROM history WHERE id = ?', [id], (e, data) => {
      if (e) {
        res.status(500).json({ message: 'Error delete data' });
        throw {
          connErr: err,
          queryErr: e
        };
      } else {
        res.send({
          code: 200,
          msg: '数据删除成功',
          data: []
        })
        console.log(data);
      }
    });
    connection.release();
  });
});
