const express=require("express")
const { getAllBooks, createBook, newBook,upload } = require("../controller/bookController")


const router=express.Router()

router.get("/",getAllBooks)
router.post("/",upload.single("cover") ,createBook)
router.get("/new",newBook)

module.exports=router