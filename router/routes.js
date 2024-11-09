const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")

router.get("/",(req,res)=>{
    res.send("Backend for mern bookstore")
})

router.post("/signup",controller.signup)
router.post("/login",controller.login)
router.get("/dashboard",controller.dashboard)
router.get("/logout",controller.logout)


module.exports = router
