const router = require("express").Router();
const userController = require("../controllers/userController");

// const { verifyUser } = require("../middleware/verifyToken");

router.get("/", userController.getAllUsers);

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.post('/logout', userController.postLogout);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

router.post('/sendmail', userController.sendMail);

// router.get('/data', verifyUser, userController.data);

module.exports = router;

