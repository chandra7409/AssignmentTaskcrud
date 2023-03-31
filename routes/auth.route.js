const {register,login,verifyToken}=require("../controllers/authjwt.controller")
module.exports=(app)=>{
    app.post("/Users/auth/api/v1/SignUp",register);
    app.post("/Users/auth/api/v1/SignIn",login);
    app.get("/Users/auth/api/v1/token", verifyToken);
}