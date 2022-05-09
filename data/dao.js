const sqlite3 = require('sqlite3').verbose()
const path = require("path");

class AppDAO {
  constructor() {
      console.log(path.resolve("nbaplayers.db"))
      console.log(path.resolve(path.join("data","nbaplayers.db")))
      this.dbFilePath = path.resolve(path.join("data","nbaplayers.db"))
      this.db = new sqlite3.Database(this.dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  run(sql, params = [], cb) {
     return this.db.run(sql, params,cb)
      // return this.db.run(sql, params, function (err) {
      //   if (err) {
      //     console.log('Error running sql ' + sql)
      //     console.log(err)
      //   } else {
      //     return  { id: this.lastID }
      //   }
      // })
  }

   get(sql, params = [], cb) {
       return this.db.get(sql, params,cb);
     // return this.db.get(sql, params, (err, result) => {
     //    if (err) {
     //      console.log('Error running sql: ' + sql)
     //      console.log(err)
     //    } else {
     //      return result
     //    }
     //  })
  }

  all(sql, params = [], cb) {
    // this.db.all(sql, params, (err, rows) => {
    //     if (err) {
    //       console.log('Error running sql: ' + sql)
    //       console.log(err)
    //     } else {
    //       return rows
    //     }
    //   })
      this.db.all(sql, params, cb)
  }


  close(){
      this.db.close((err) => {
        if (err)
          console.log(err.message);
        else
          console.log('Close the database connection.')
      });
  }

  test(){
      this.db.run("")
  }
}


module.exports = {AppDAO}