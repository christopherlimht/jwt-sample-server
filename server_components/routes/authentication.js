var express = require('express')
var router = express.Router()
var jwtTokenHelper = require("../helpers/jwtHelper.js")
var userAuthHelper = require("../helpers/userAuthHelper.js")
var response = {
  msg: "",
  output: ""
}

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

/**
 * @api {post} https://<url>:<port>/auth/register/ register
 * 
 * @apiGroup Authentication
 * @apiName register
 * @apiVersion 0.1.0
 * @apiDescription 
 * Register user account function
 * 
 * @apiParam username username for new account
 * @apiParam password password for new account
 * @apiParamExample Request-Example:
 *  {
 *      "username":"sampleUsername",
 *      "password":"examplePassword"
 *  }
 *
 * @apiSuccess response server response
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "response": true,
 *    "msg": "user has been registered successfully"
 *  }
 * 
 * @apiError response server response
 * @apiError msg More detailed server response
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden Error
 *      {
 *        "response": false,
 *        "msg": "user is already registered"
 *      }
 * 
 */
router.post('/register', function (req, res) {
  var jsonObj = req.body;
  var result = userAuthHelper.register(jsonObj)
  if(result.response){
    res.status(200)
  }else{
    res.status(403)
  }
  res.send(result);
})

/**
 * @api {post} https://<url>:<port>/auth/login/ login
 * 
 * @apiGroup Authentication
 * @apiName Login
 * @apiVersion 0.1.0
 * @apiDescription 
 * Login with username and password
 * 
 * @apiParam username username for new account
 * @apiParam password password for new account
 * @apiParamExample Request-Example:
 *  {
 *      "username":"sampleUsername",
 *      "password":"examplePassword"
 *  }
 *
 * @apiSuccess response server response
 * @apiSuccess msg More detailed server response
 * @apiSuccess token JWT issued upon successful login
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "response": true,
 *    "msg": "login success",
 *    "token":"sampleJWTvalue"
 *  }
 * 
 * @apiSuccess response server response
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Failure-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "response": false,
 *    "msg": "wrong password",
 *  }
 * 
 */
router.post('/login', function (req, res) {
  var jsonObj = req.body;
  userAuthHelper.login(jsonObj).then(result =>{
    if(result.token !== null){
      res.cookie("loginJWT",result.token,{
        maxAge:90000000,
        httpOnly:true,
      })
    }
    res.status(200)
    res.send(result);
  }).catch(err =>{
    res.status(403)
    res.send(err)
  })
})

/**
 * @api {post} https://<url>:<port>/auth/logout/ logout
 * @apiHeader loginJWT http-only cookie for session tracking
 * @apiHeaderExample Set-cookie
 *  {
 *      "loginJWT":"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig"
 *  }
 * @apiGroup Authentication
 * @apiName logout
 * @apiVersion 0.1.0
 * @apiDescription 
 * Performs logout
 * 
 * @apiParam username username for new account
 * @apiParamExample Request-Example:
 *  {
 *      "username":"sampleUsername"
 *  }
 *
 * @apiSuccess response server response
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "response": true,
 *    "msg": "cookies cleared"
 *  }
 * 
 * 
 */
router.post('/logout', function (req, res) {
  var jsonObj = req.body;
  console.log(jsonObj);
  console.log("cookies: "+JSON.stringify(req.cookies))
  var response={
    msg:"cookies cleared",
    response:true
  }
  res.clearCookie("loginJWT")
  res.status(200)
  res.send(response)
})

/**
 * @api {post} https://<url>:<port>/auth/generateToken/ Generate Token
 * @apiHeader loginJWT http-only cookie for session tracking
 * @apiHeaderExample Set-cookie
 *  {
 *      "loginJWT":"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig"
 *  }
 * @apiGroup Authentication
 * @apiName Generate Token
 * @apiVersion 0.1.0
 * @apiDescription 
 * Generates JWT Token
 * 
 * @apiParam payload payload to be used in JWT generation
 * @apiParamExample Request-Example:
 *  {
 *      "payload":"sample payload"
 *  }
 *
 * @apiSuccess output Generated JWT
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "output": "sampleJWTvalue",
 *    "msg": "Token generation success"
 *  }
 * 
 * 
 */
router.post('/generateToken', function (req, res) {
  var jsonObj = req.body;
  console.log(jsonObj);
  var payload = jsonObj.payload
  jwtTokenHelper.generateToken(payload).then((output)=>{
    response.msg = "Token generation success"
    response.output = output
    res.status(200)
    res.send(response)
  }).catch(err =>{
    response.msg = "Token generation failed"
    response.output = err
    res.status(200)
    res.send(response)
  })
})

/**
 * @api {post} https://<url>:<port>/auth/verifyToken/ Verify Token
 * @apiHeader loginJWT http-only cookie for session tracking
 * @apiHeaderExample Set-cookie
 *  {
 *      "loginJWT":"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig"
 *  }
 * @apiGroup Authentication
 * @apiName Verify Token
 * @apiVersion 0.1.0
 * @apiDescription 
 * Verify generated JWT Token
 * 
 * @apiParam payload jwt token value
 * @apiParamExample Request-Example:
 *  {
 *      "payload":"encodedSampleJWTTokenValue"
 *  }
 *
 * @apiSuccess output Decoded JWT value
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "msg": "Token verification success"   
 *    "output":{
 *      "payload": "decodedSampleJWTTokenValue",
 *      "iat": 1591882089,
 *      "exp": 1591968489
 *    }
 *  }
 * 
 * @apiSuccess output Verify Token results
 * @apiSuccess msg More detailed server response
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "msg": "Token verification fail"   
 *    "output":{
 *      "name": "TokenExpiredError",
 *       "message": "jwt expired",
 *       "expiredAt": "2020-05-28T10:06:05.000Z"
 *    }
 *  }
 * 
 * 
 */
router.post('/verifyToken', function (req, res) {
  var jsonObj = req.body;
  console.log(jsonObj);
  var payload = jsonObj.payload
  jwtTokenHelper.verifyToken(payload).then((output)=>{
    response.msg = "Token verification success"
    response.output = output
    res.status(200)
    res.send(response)
  }).catch(err =>{
    response.msg = "Token verification failed"
    response.output = err
    res.status(200)
    res.send(response)
  })
})

module.exports = router