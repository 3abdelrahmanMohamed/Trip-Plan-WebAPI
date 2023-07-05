const express = require('express');
const router = express.Router();
const sql = require('mysql');


// connection configurations
var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL1234@',
    database: 'countries'
    });
    // connect to database
    connection.connect();


// get a list of countries 
router.get('/countries/countrylist', function(req,res){
    connection.query("select * from countries.countrylist" , (err,result)=>{
				if(err){res.send("error in the connection for get.")}
        else{res.send(result)}
})	
});

//get a list of countries filtered by budget or location
router.get('/countries/countrylist/budget', function(req,res){
    locationchosen = req.query.location;
    if (locationchosen == "Any") {
        connection.query("select * from countries.countrylist WHERE averageprice < ?",req.query.budget , (err,result)=>{
            if(err){res.send("error in the connection for get.")}
    else{res.send(result)}
    })	
    }
    else {
        connection.query("select * from countries.countrylist WHERE countryname = ?",req.query.location , (err,result)=>{
            if(err){res.send("error in the connection for get.")}
    else{res.send(result)}
    })	
    }
    

});


// get users
router.get('/users',(req, res)=> {
   // if the token exists then return all users otherwise don't 
    connection.query('select fname from Users.userlist where token =?',req.query.token,function(error, result){
        if(error) {console.log("error")}
        
        else if(result == ''){res.send('Invalid Token')}
        else{
            connection.query('select * from Users.userlist',function(error, result){
                if(error) {console.log("error")}
                else{res.send(result)}
            })
        }})

})

// make new user
router.post('/users/register',(req, res)=> {
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    token = require('crypto').randomBytes(64).toString('hex') // to generate a random tokens
    console.log(token);

    connection.query('insert into Users.userlist(fname,lname,email,token, usertype) values (?,?,?,?, "User")', [fname,lname,email, token],(err,result)=>{
        if(err) throw err;
        else{res.send(result)}
    })
    console.log("token created!")
})

//if admin, make new admin
router.put('/users/updateuser',(req, res)=> {
    let fname = req.body.fname
    let lname = req.body.lname
    let usertype = req.body.usertype

    connection.query('select fname from Users.userlist where token =?',req.query.token,function(error, result){
        if(error) {console.log("error")}
        
        else if(result == ''){res.send('Invalid Token')}
    else{
        connection.query('update Users.userlist SET usertype =? WHERE fname =? AND lname = ?', [usertype,fname,lname],(err,result)=>{
            if(err) throw err;
            else{res.send(result)}
            console.log("User updated.")
        })
    }})
})

// add a new country 
router.post('/countries/countrylist', function(req,res){
    console.log(req.body);
    connection.query("INSERT INTO `countrylist` VALUES (?,?,?,?,?,?);",[req.body.countryname, req.body.famousfood, req.body.currency, req.body.famousactivity,req.body.averageprice,req.body.flag] , (err,result)=>{
        if(err){res.send("error in the connection for post.")}
else{res.send("Task added successfully!")}
})	
});

// update the food
router.put('/countries/:name', function(req,res){
    let name = req.params.name
    let Newfood = req.body.famousfood
    connection.query('update tasks set famousfood = ? where name = ?', [name , famousfood ], (err, result)=> {
        if(err)throw err;
        else{connection.query('SELECT * FROM countries.countrylist where name = ?' ,name, (err, result)=> {
            if(err){res.send("error in the connection")}
            else{res.send(result)}})}
})
});

// delete a country 
router.delete('/countres/:name', function(req,res){
    res.send({type:'Delete'});
});

// to be able to use the API in the index file 
module.exports = router;