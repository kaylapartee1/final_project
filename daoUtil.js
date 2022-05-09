const appDAO = require('./appObjects')

const db = require('./data/dao')
const path = require("path");

class UserDAO{
    static addUser(user,cb){
        var daoConn = new db.AppDAO()
        var sqlCom = 'insert into users (name, email, password) values (?,?,?);'
        var ret=daoConn.run(sqlCom, [user.name, user.email, user.password], cb)
    }

    static update(user,cb){
        var daoConn = new db.AppDAO()
         var sqlCom = 'select *\n' +
             '        from users;\n' +
             '        update users\n' +
             '        set  users.name=? , users.email=?, users.password=?' +
             '        where id=?;'

        var ret=daoConn.run(sqlCom, [user.name, user.email, user.passwd], user.id, cb)

    }

    static selectById(userId,cb){
        var daoConn = new db.AppDAO()
        var sqlCom = 'select name, email, password from users WHERE users.id=?'
        var user=daoConn.get(sqlCom, [userId], cb)
    }
    static searchByEmail(email,cb){
        var daoConn = new db.AppDAO()
        var sqlCom = 'select name, email, password from users WHERE users.email=?'
        var user=daoConn.get(sqlCom, [email], cb)
    }
}

class PlayerDAO{

    static selectById(playerId,cb){
        var daoConn = new db.AppDAO()
        var sqlCom = 'select * from nba_players where id=?;'
        var player =daoConn.get(sqlCom, [playerId],cb)
    }

    static incrementLikes(playerId,cb){
        var daoConn = new db.AppDAO()
        var sqlCom = 'update nba_players set likes = likes+1 where id=?;'
        var ret =daoConn.run(sqlCom, [playerId], cb)
    }

    static searchByName(keyword,cb){
        var daoConn = new db.AppDAO()
         var sqlCom =
             'select * from nba_players where player_name like %?%;'
        var players =daoConn.all(sqlCom, [keyword], cb)
    }

    static selectTop100ByLikes(cb){
        var daoConn = new db.AppDAO()
        var sqlCom =
             'select * from main.nba_players ORDER BY likes DESC limit 100;'

        return daoConn.all(sqlCom, [], cb)
    }

    static selectPages(pageno, limit,cb){
        var daoConn = new db.AppDAO()
        //assumes pages of 100 counts
        var offset = pageno * 100
        var sqlCom =
             'select * from nba_players ORDER BY player_name limit ? offset ?;'
       var players =   daoConn.all(sqlCom, [limit, offset], cb)
    }

}

module.exports = {playerDAO:PlayerDAO,userDAO:UserDAO }