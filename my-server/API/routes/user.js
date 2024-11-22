const express = require('express');
const router = express.Router();

const userController = require('../Controller/user')


router.post('/signup', userController.sign_up_user)

router.post('/login', userController.login_user)


//middleware functions
router.get('/', userController.get_all_users);
router.post('/', userController.create_user);
router.delete('/:userId', userController.delete_user);
router.patch('/:userId', userController.update_user);


module.exports = router;