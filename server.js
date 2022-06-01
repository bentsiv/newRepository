const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const { loadavg } = require('os')
const secret="1234"

const users=[{
    name:'avi',
    email:'a@a',
    pass:'1234'
}]

function createToken(id){
const token=jwt.sign({_id:id},secret,{expiresIn:"10m"})
return token
}
function login(email,pass){
    
const find=users.find(user=>user.email==email)
if(!find || find.pass!=pass) throw "missing pass";

const token=createToken(find._id)
return token

}

function log(){
    try {
        const token= login('a@a',"1234")
        
        const res=authToken(token)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
    
}
log()
//להמשיך עם הטוקן

function authToken(token){
    const decode=jwt.verify(token,secret)
    const id=decode._id
    const founduUser=users.find(u=>u._id=id)
    return founduUser
    }


app.listen(3210,()=>console.log("server is app"))