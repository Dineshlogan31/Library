const Author=require("../models/authorModel")
const Books=require("../models/bookModel")
const multer=require("multer")
const fs=require("fs")
const path=require("path")

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

  let query=Books.find().lean()
  if(req.query.title != null && req.query.title != "")
  {
    query.regex("title",new RegExp(req.query.title,"i"))
  }

try {
  let book= await query.exec()
  // console.log(book);
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
      // console.log(req.file);
        // console.log(book);
      try {
        await Books.create(book)
        
        res.redirect("/books")
      } catch  {
        if(book.cover !=null)
        {
          removeCover(book.cover)
        }
        renderNewPage(res,book,true)
      }
}
async function newBook(req,res)
{
  renderNewPage(res,new Books())
  
}

async function renderNewPage(res,book,haserror=false)
{
  try {
    let author= await Author.find({}).lean()

    let params={
      author:author,
      book:book
    }
    if(haserror)
    {
      params.errorMessage="Couldn't Create Book"
    }
    res.render("books/new",params)
    
  } catch  {
    res.redirect("/")
  }
}

function removeCover(cover)
{

  fs.unlink(path.join("public/uploads",cover.filename),(err)=>{
    if(err)
    console.log(err);
  })

}

module.exports={
    getAllBooks,
    createBook,
    newBook,
    upload
}