const mysql = require("mysql2");

const dbConfiguration = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog_db"
}

function onDatabaseConnection(error) {
    if (error) throw err;
    console.log('Sei connesso al DB!');
};

const dbConnection = mysql.createConnection(dbConfiguration);
dbConnection.connect(onDatabaseConnection);



module.exports = dbConnection;




// const connection = mysql.createConnection({
// host: 'localhost',
// user: 'root',
// password: 'root',
// database: 'blog_db'
// });

// connection.connect((err) => {
// if (err) throw err;
// console.log('Sei connesso al DB!');

// module.exports = connection;