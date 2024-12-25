const User = require("../models/user")
async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}
async function handlegetUserById(req,res){
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(402).json({ Error: "User not found" });
    }
    return res.status(201).json({ Status: "Sucess", Detail: user });
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, { lastName: "chnaged" });
    return res.json({ Status: "Updated Sucessfully" });
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Deleted Sucessfully" });
}
async function handleCreateNewUser(req,res){
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ Message: "Fill the correct parameter" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      });
      console.log("result", result);
      return res.status(201).json({ Msg: "Success",id: result._id });
}
module.exports={
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}