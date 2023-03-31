const {CreateTask,
    UpdateTask,
    GetTask,
    GetAllTask,
    DeleteTask,}=require("../controllers/user.controller");
module.exports=(app)=>{
    app.post("/Assign/api/v1/user",CreateTask);
    app.get("/Assign/api/v1/user/:id",GetTask);
    app.get("/Assign/api/v1/user",GetAllTask);
    app.put("/Assign/api/v1/user/:id",UpdateTask);
    app.delete("/Assign/api/v1/user/:id",DeleteTask);
}