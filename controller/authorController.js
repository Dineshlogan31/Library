const Author=require("../models/authorModel")

async function getAllAuthors(req,res)
{
   try {
      
      let searchOptions={}
      if(req.query.name !=null || req.query.name !="")
      {
        searchOptions.name=new RegExp(req.query.name,"i")
      
      }
      let author=await Author.find(searchOptions).lean()
      res.render("authors/index",{author,Msg:req.query.name})
   } catch  {
    res.render("authors/index",{error:"COuldn't Find"})
   }
}

async function createAuthor(req,res)
{
    let name={
        name:req.body.name
    }
    try {
        await Author.create(name)
        res.redirect("authors")
    } catch (error) {
        res.render("authors/new",{error:"Couldn't create Author"})
        
    }
}
function newAuthor(req,res)
{
    res.render("authors/new")
}

module.exports=
{
    getAllAuthors,
    createAuthor,
    newAuthor
}