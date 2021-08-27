const Blog = require("../model/blog.model");

const blogController = {
    //creating a data
    createBlog: async (req, res) => {
        try {
            const {title, body} = req.body;
            if(!title || !body){
                return res.status(400).json({message:"All fields are reqired"});
            } 

            req.user.password = undefined;
            req.user.confirmpassword = undefined;
            const blog = new Blog({
                Uname,
                age,
                dateofbirth,
                postedBy:req.user,
            })
            await blog.save();
            return res.status(200).json({blog});

        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },
    //Retrive a data
    getblog: async (req, res) => {
        try {
           const getBlogData = await Blog.find().populate("postedBy","_id username email")
           res.status(200).json({getBlogData}); 
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },
    //Updating changes
    updateBlog: async (req, res) => {
        try {
            const blog = new Blog({
                _id:req.params.id,
                Uname:req.body.Uname,
                age:req.body.age,
                dateofbirth:req.body.dateofbirth,
                postedBy:req.user
            })
            const updateBlogData = await Blog.updateOne({_id:req.params.id}, blog);
            return res.status(200).json({message:"updated successfully"});
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    },
    //Deleting Single data
    deleteBlog: async (req, res) => {
        try {
            const deleteData = await Blog.deleteOne({_id:req.params.id});
            return res.status(200).json({message:"deleted successfully"});
        } catch (error) {
            return res.status(404).json({message:error.message});
        }
    }
}

module.exports = {blogController};