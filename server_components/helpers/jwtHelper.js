var jwt = require("jsonwebtoken")
var fs  = require("fs")

var privatekey=fs.readFileSync("server_resources/private.key","utf8");
var publickey=fs.readFileSync("server_resources/public.key","utf8");
var encryptionAlgo="RS256"
var tokenTTL = "1d"

function generateToken(payload){
    return new Promise((resolve,reject) => {
        jwt.sign({payload}, privatekey, { 
            algorithm: encryptionAlgo,
            expiresIn: tokenTTL
        },(err, token) => {
            if(err){ 
                reject(err);
            }else{
                resolve(token);
            }
        });
    })
}

function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,publickey,(err, payload)=>{
            if(err){
                reject(err);
            } else {
                resolve(payload);
            }
        })
    });
}

module.exports={
    generateToken:generateToken,
    verifyToken:verifyToken
}