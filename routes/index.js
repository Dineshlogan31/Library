const express=require("express")
const { home } = require("../controller/indexController")


let router=express.Router()

router.get("/",home)

module.exports=router