// import mpngoose first
let mongoose = require("mongoose")
// connect to db (asynchronosly)
mongoose
   .connect("mongodb://localhost/mern")
   .then((res) => console.log("connection istablished"))
   .catch((err) => console.log("err"))

// // make a schema
// const coursesSchema = mongoose.Schema({
//    name: String,
//    author: String,
//    tags: [String],
//    price : Number,
//    date: { type: Date, default: Date.now() },
//    isPublished: Boolean
// })
// // schema with validation 
// const coursesSchemaValidate = mongoose.Schema({
//    name: {type : String, required : true},
//    // if name isnt a string or not required => error
//    author: {type : String , minlength : 3},
//    tags: {
//       type : Array,
//       validate : {
//          validator : function (tag) {
//             return tag && tag.length > 2
//          },
//          message : "bro wtf"
//       }
//    },
//    price : {
//       type : Number ,
//       required : function () { return this.isPublished} ,
//       min : 0,
//       max : 199
//    },
//    date: { type: Date, default: Date.now() },
//    isPublished: Boolean,
//    // category : {
//    //    type : String,
//    //    enum : ["web", "network", "mobile"]
//    // }
//    // enum means that category should be one of the values
// })


// make a model (like a db)
const Course = mongoose.model("Course", coursesSchema)

// start creating your courses
const addCourse = async ( courseObj ) => {
    const course = new Course(courseObj)
    const result = await course.save()
    console.log(result);
}
const getCourse = async ( filter ) => {
   console.log(await Course.findOne(filter));
} 
const getCourses = async ( filter ) => {
   console.log(await Course.find(filter));
} 
const removeCourses  = async (filter) => {
   console.log(await Course.find(filter).updateMany({isDeleted :true}))
}
const updateCourse = async ( filter, payload ) => {
   console.log(await Course.updateOne( filter , { $set : payload }));
}
const clearCourses = async () => {
   console.log(await Course.collection.deleteMany({}));
}
const makePriceFree = async ( id ) => {
   console.log(await Course.updateOne( {_id : id} , { $set : {price : 0} }));
}

