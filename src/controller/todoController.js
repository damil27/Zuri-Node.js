const Todo = require("../model/todo")


// get all users

exports.getAllTodo = async (req, res) =>{
    try {
        let users = await Todo.find();
        if(users.length === 0){
            return res.status(404).json({
                success: false,
                message: "There is no record"
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo  found",
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}
// get single todo
exports.getSingleTodo = async (req, res) =>{
    try {
        let id = {_id : req.params.id}
        let todo = await Todo.findOne(id);
        if(!todo) return res.status(404).json({
            success: false,
            message: "Todo list not found"
        })
        res.status(200).json({
            success: true,
            message: "todo found",
            todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// create Todo
exports.createTodo = async (req, res) =>{
    try {
        let todo  = await req.body;
        let newTodo = await Todo.create(todo);
        if(!newTodo) return res.status(400).json({
            success: false,
            message: "Todo creation failed",
        })
         return res.status(201).json({
            success: true,
            message: "new todo created successfully.",
            todo: newTodo
         })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "internal server error",
            error: error.message
        })
    }
}

// update users

exports.updateTodo =  async (req, res) =>{
    try {
        
        let id  = {_id: req.params.id};
        let todo =  await req.body;
        let updated = await Todo.findOneAndUpdate(id, todo, {new: true});
        
        if(!updated) return res.status(400).json({
            success: false,
            message: "update failed."
        })
        return res.status(200).json({
            success: true,
            message: "Todo updated successful",
            todo: updated
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }

}

// delete users 
exports.deleteTodo =  async (req, res) =>{
    try {
        let id = {_id: req.params.id}
        let deleted = await Todo.findOneAndRemove(id);
        if(!deleted) return res.status(400).json({
            success: false,
            message:"bad request",
        })
        return res.status(200).json({
            success: true,
            message: "Todo successfully deleted",
            deleted
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}