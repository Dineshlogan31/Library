const {model,Schema, default: mongoose}=require("mongoose")

const bookSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        publishDate:{
            type:Date,
            required:true
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"authorModel"
        },
        description:{
            type:String,
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now()

        },
        cover:{
            type:[""],
            required:true
        }
    }
)
module.exports=model("bookModel",bookSchema)