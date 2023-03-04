const Author=require("../models/authorModel")
const Books=require("../models/bookModel")
const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage
})

async function getAllBooks(req,res)
{

try {
  let book= await Books.find({}).lean()
  console.log(book);
  res.render("books/index",{book})
} catch (error) {
  res.redirect("/")
}
}
async function createBook(req,res)
{
      let book={
        title:req.body.title,
        publishDate:new Date(req.body.publishdate),
        author:req.body.author,
        description:req.body.description,
        cover:req.file

      }
      console.log(req.file);
        console.log(book);
      try {
        await Books.create(book)
        
        res.redirect("/books")
      } catch  {
        res.render("books/new")
      }
}
async function newBook(req,res)
{

   let author= await Author.find({}).lean()
    res.render("books/new",{author})
}

module.exports={
    getAllBooks,
    createBook,
    newBook,
    upload
}