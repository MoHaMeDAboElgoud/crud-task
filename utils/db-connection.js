// const sqlite3 = require("sqlite3").verbose();

// const DBSOURCE = "db.sqlite"

// const db = new sqlite3.Database(DBSOURCE, (err) => {
//     if (err) {
//       // Cannot open database
//       console.error(err.message)
//       throw err
//     }else{
//         console.log('Connected to the SQLite database.')
//         db.run(`CREATE TABLE users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text, 
//             email text UNIQUE, 
//             password text, 
//             CONSTRAINT email_unique UNIQUE (email)
//             )`,
//         (err) => {
//             if (err) {
//                 // Table already created
//                 console.log("Table Users Already Exists");
//             }
//         });
//         db.run(`CREATE TABLE tasks (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text,
//             description text
//             )`,
//         (err) => {
//             if (err) {
//                 // Table already created
//                 console.log("Table Tasks Already Exists");
//             }
//         });
//     }
// });

// module.exports = db;