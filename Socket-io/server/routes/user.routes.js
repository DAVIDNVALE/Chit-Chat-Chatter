import {Router} from 'express'
import { UserController } from "../controllers/user.controllers.js"

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/get/user/:id', UserController.getLoggedInUser)
router.delete('/get/user/:id', UserController.deleteUser)

export default router;