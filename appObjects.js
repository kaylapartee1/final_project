const path = require("path")
const crypto = require("crypto")

class User {

    constructor(name, email, password) {
        this.id = -1
        this.name = name
        this.email = email
        this.password = crypto.createHash('md5').update(password).digest('hex');
    }


}

class Player{
    constructor(playerInfo) {
        let i=0
        this.id =playerInfo[i]
        this.player_name= playerInfo[(++i)]
        this.team_abbreviation = playerInfo[(++i)]
        this.age =  playerInfo[(++i)]
        this.player_height =  playerInfo[(++i)]
        this.player_weight =  playerInfo[(++i)]
        this.college =  playerInfo[(++i)]
        this.country =  playerInfo[(++i)]
        this.draft_year =  playerInfo[(++i)]
        this.draft_round =  playerInfo[(++i)]
        this.draft_number =  playerInfo[(++i)]
        this.gp =  playerInfo[(++i)]
        this.pts =  playerInfo[(++i)]
        this.reb =  playerInfo[(++i)]
        this.ast =  playerInfo[(++i)]
        this.net_rating =  playerInfo[(++i)]
        this.oreb_pct =  playerInfo[(++i)]
        this.dreb_pct =  playerInfo[(++i)]
        this.usg_pct =  playerInfo[(++i)]
        this.ts_pct =  playerInfo[(++i)]
        this.ast_pct =  playerInfo[(++i)]
        this.season =  playerInfo[(++i)]
        this.likes =  playerInfo[(++i)]
    }

}

module.exports = {player:Player,user:User }