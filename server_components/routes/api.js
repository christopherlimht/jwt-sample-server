var express = require('express')
var router = express.Router()
var jwtTokenHelper = require("../helpers/jwtHelper.js")
const debug = true

// Middleware that checks for token validity for all functions under /api
router.use(function (req, res, next) {
  if(req.cookies.loginJWT === null || req.cookies.loginJWT === ''){
    var response ={
      msg: "Please login before accessing this resource"
    }
    res.send(response)
    return
  }
  jwtTokenHelper.verifyToken(req.cookies.loginJWT).then((result)=>{
    req.body.decryptedToken = result
    next()
  }).catch(err => {
    var resMsg=''
    if (err.name === 'TokenExpiredError'){
      resMsg = "Token has expired"
    }else{
      resMsg = "Your Token is invalid"
    }
    var response ={
      msg: resMsg
    }
    res.status(403)
    res.send(response)
  })
})

/**
 * @api {post} https://<url>:<port>/api/function1/ function1
 * @apiHeader loginJWT http-only cookie for session tracking
 * @apiHeaderExample Set-cookie
 *  {
 *      "loginJWT":"=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidXNlcjEifSwiaWF0IjoxNTkxODcwNDczLCJleHAiOjE1OTE5NTY4NzN9.2Ew9OCviCilqlvHZ6zSl_siNAmtuJFpKKiSM52jmZiUT_N_Wj_3CbVRvxI41yXvbnWNNWhc2MkMQ7-p0df0Vig"
 *  }
 * 
 * @apiGroup API
 * @apiName function1
 * @apiVersion 0.1.0
 * @apiDescription 
 * Sample function to test JWT and session tracking
 * 
 * @apiParam payload   sample payload
 * @apiParamExample Request-Example:
 *  {
 *      "payload":"sample payload value"
 *  }
 *
 * @apiSuccess msg login message containing username of user calling api
 * @apiSuccess postedPayload the payload sent over to api in initial call
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *  {
 *    "msg": "Welcome <username>!",
 *    "postedPayload": "sample payload value"
 *  }
 * 
 * @apiError msg server response
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden Error
 *      {
 *        "msg":"token has expired"
 *      }
 * @apiError msg server response
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 403 Forbidden Error
 *      {
 *        "msg":"Your token is invalid"
 *      }
 * 
 */
router.post('/function1', function (req, res) {
  var jsonObj = req.body;
  var tokenPayload = req.body.decryptedToken.payload;
  if (debug){
    console.log("User \""+tokenPayload.username+"\" has sent payload : ")
    console.log(jsonObj.payload)
  }
  
  var response ={
    msg:"Welcome "+tokenPayload.username+"!",
    postedPayload:jsonObj.payload
  }
  res.status(200)
  res.send(response)
})
module.exports = router