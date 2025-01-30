import express from 'express';
const router = express.Router();
import userCtrl from '../controller/user.ctrl.js'


router.post('/signup',userCtrl.signup)
router.post('/login',userCtrl.login)

export default router;