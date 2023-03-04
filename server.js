const express=require("express")
const {engine}=require("express-handlebars")
const  handlebars =require("handlebars")
const router = require("./routes/authorRoute")
const bookRoute=require("./routes/bookRouter")
const library=require("./routes/index")
const {mongoose} =require("mongoose")


if(process.env.NODE_ENV !== "production")
{
    require("dotenv").config()
}

const app=express()

mongoose.set("strictQuery",true)
mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(err) throw err
    console.log("db connected");
})
app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))

handlebars.registerHelper("trimString",function(pathString)
{
    let newString=pathString.slice(6)
    console.log(newString);
    return new handlebars.SafeString(newString)
})

app.use("/",library)
app.use("/authors",router)
app.use("/books",bookRoute)


app.listen(process.env.PORT || 5000,(err)=>{
    if(err) throw err
    console.log("server running on port 5000");
})

