const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");
// By using MVC we customized the route module
// To combine .get and .post because the route path is same
// router.get("/", handleGetAllUsers);
// router.post("/", handleCreateNewUser);
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser)
router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports=router;