var express =  require('express')
var router = express.Router();
const path = require('path')
const appObject = require('../appObjects')
const DAO = require(path.join(__dirname, '..', 'daoUtil'))

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public','nbaplayers.html'))
})

router.get('/nba',(req,res)=>{
    // res.sendFile(path.join(__dirname,'..', 'public','nbaplayers.html'))
    res.render('public/nbaplayers', {username: req.session.username})
})

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public','login.html'))
})

router.get('/login',(req,res)=>{
    // res.sendFile(path.join(__dirname,'..', 'public','login.html'))
    res.render('pages/auth', {username: req.session.username})
})


router.post('/login',(req,res)=>{
  //TODO:this method has not been implemented
    let email = req.body.username
    let password = req.body.passwd
    if (email && password){
        DAO.userDAO.searchByEmail(email, (err,data)=>{
            if (err){
                res.render('pages/msg', {message:'Failed, try again ',username: ''})
            }else if(data){
                res.render('pages/login', {message:`Welcome back, ${email}.`, username:''})
            }
        })
    }

})

router.get("/reg", (req, res)=>{
    res.render('pages/reg', {username: req.session.username})
})
router.post("/reg", (req, res)=>{
    let name = req.body.name
    let email = req.body.username
    let password = req.body.passwd
    if(name && email && password){
        DAO.userDAO.searchByEmail(email, (err,data)=>{
            //this is the call back function to check the result of email lookup
            if(err){
                res.render('pages/msg', {message:`Error 501: Registration failed.`, username:''})
            }else if (data){
                res.render('pages/msg', {message:`There is an account with your email ${email}.`, username:''})
            }else{
                //Now we need to complete the registration process
                let name = req.body.name
                let email = req.body.username
                let password = req.body.passwd
                let user = new appObject.user(name, email, password)
                DAO.userDAO.addUser(user, (err, data)=>{
                    //This is the call back function for handling the outcome of the addUser function

                    if(err){
                        res.render('pages/msg', {message:`Error 502: Registration failed.`,username:''})
                    }else{
                        res.redirect('/auth')
                    }
                })
            }
        })

    }

})



module.exports = router