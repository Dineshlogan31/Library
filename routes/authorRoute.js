const express=require("express")
const { getAllAuthors, createAuthor, newAuthor } = require("../controller/authorController")



let router=express.Router()

router.get("/",getAllAuthors)
router.post("/",createAuthor)
router.get("/new",newAuthor)


module.exports=router