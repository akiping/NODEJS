const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'bdfjv9z5yl1yt9hetcsv-mysql.services.clever-cloud.com',
    user: 'uibwgbqpx2vtgssh',
    password: 'wesq4iKAvGzv6PujorTW',
    database: 'bdfjv9z5yl1yt9hetcsv'
});

module.exports = pool.promise();
