const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const jwtHelper = require('./jwtHelper.js')
db.defaults({ users: [{}]}).write()

//console.log(db.get('users').find({username:'user2'}).value());
// // Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()

// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
  
// // Increment count
// db.update('count', n => n + 1)
//   .write()

function isBlank(str) {
  return (!str || /^\s*$/.test(str))
}

function registerUser(payload){
  var user = payload.username
  var pass = payload.password
  var res = {
    response:'',
    msg:""
  }
  if(isBlank(user) || isBlank(pass)){
    res.response = false
    res.msg="username or password is blank"
  }
  else{ 
    if(db.get('users').find({username:user}).value() == null){
      db.get('users').push({username:user,password:pass}).write()
      console.log("Username: \""+user+"\" has been registered with the system")
      res.response = true
      res.msg = "user has been registered successfully"
    }
    else{
      res.response=false
      res.msg="user is already registered"
    }
  }
  return res
}

function login(params){
  return new Promise((resolve,reject) => {
    var user = params.username
    var pass = params.password
    var res = {
      response:'',
      msg:""
    }
    if(isBlank(user) || isBlank(pass)){
      res.response = false
      res.msg="username or password is blank"
      resolve(res)
    }
    else{ 
      if(db.get('users').find({username:user}).value() == null){
        res.response=false
        res.msg="user cannot be found"
        resolve(res)
      }
      else{
        var record = db.get('users').find({username:user}).value()
        if(record.password === pass){
          var payload = {
            username:user
          }
          jwtHelper.generateToken(payload).then(token =>{
            res.token = token
            res.response = true
            res.msg = "login success"
            console.log("Username: \""+user+"\" has logged in successfully")
            resolve(res)
          })
        }else{
          res.response=false
          res.msg="wrong password"
          console.log("Username: \""+user+"\" has logged in unsuccessfully")
          resolve(res)
        }
      }
    }
  })
}
  
module.exports={
  register:registerUser,
  login:login
}